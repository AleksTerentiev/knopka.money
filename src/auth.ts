import { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

export type AuthProvider = 'auth0' | 'google' | 'fb' | 'vk' | 'ok' | 'mailru';

let popupWindow: Window | null;

function openPopup(provider: AuthProvider) {
  const width = 700;
  const height = 800;
  const top = window.innerHeight / 2 - height / 2;
  const left = window.innerWidth / 2 - width / 2;
  return window.open(
    `${process.env.REACT_APP_API_URL}/auth/${provider}`,
    'auth',
    `toolbar=no, location=no, directories=no, status=no, menubar=no,
     width=${width}, height=${height}, top=${top}, left=${left}
    `
  );
}

export const useAuthPopup = () => {
  const apolloClient = useApolloClient();
  const history = useHistory();

  useEffect(() => {
    function loginWindowMessageListener(event: MessageEvent) {
      if (event.origin !== process.env.REACT_APP_API_URL) {
        return;
      }
      const { action, success } = JSON.parse(event.data);
      if (action !== 'auth' || success !== true) {
        return;
      }
      if (popupWindow) {
        popupWindow.close();
      }
      apolloClient.reFetchObservableQueries();
      history.push('/');
    }

    window.addEventListener('message', loginWindowMessageListener);
    return () => {
      window.removeEventListener('message', loginWindowMessageListener);
      if (popupWindow) {
        popupWindow.close();
      }
    };
  }, [apolloClient, history]);

  return {
    loginWithPopup: (provider: AuthProvider) => {
      popupWindow = openPopup(provider);
    },
  };
};
