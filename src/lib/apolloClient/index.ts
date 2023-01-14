import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_URL = `${process.env.cms}/graphql`;

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});
