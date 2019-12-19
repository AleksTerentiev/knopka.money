import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
// import { changeBalance } from './balances';

export const apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_API_ORIGIN}/graphql`,
  credentials: 'include',
  cache: new InMemoryCache(),
  resolvers: {
    // Mutation: {
    //   changeBalance,
    // },
  },
});
