import ApolloClient, { InMemoryCache } from 'apollo-boost';

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
