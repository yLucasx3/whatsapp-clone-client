import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

/**
 * @see https://www.apollographql.com/docs/react/data/subscriptions
 */

const httpGqlLink = new HttpLink({
  uri: 'http://localhost:3001/graphql'
});

const wsGqlLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3001/graphql'
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsGqlLink,
  httpGqlLink
);

export const mainGqlClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
