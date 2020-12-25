import ApolloClient, { InMemoryCache } from 'apollo-boost';

export const apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  credentials: 'include',
  cache: new InMemoryCache(),
});
