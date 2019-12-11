import React from 'react';
import './home.scss';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';

export const Home: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation();

  return (
    <div className='Home-root'>
      <header className='Home-header'>
        {/* <div className='Home-header_pic'>
          <span className='Home-header_pic_x'>X</span>
          <span className='Home-header_pic_2'>2</span>
        </div>
        <h1 className='Home-header_text'>{t('Double your deposit now')}!</h1>
        <h2 className='Home-header_text'>({t('50% per day')})</h2> */}
      </header>
    </div>
  );
};
