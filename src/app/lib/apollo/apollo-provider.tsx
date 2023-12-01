'use client';

import { HttpLink, split, useApolloClient } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache
} from '@apollo/experimental-nextjs-app-support/ssr';
import { useSession } from 'next-auth/react';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

declare module '@apollo/client' {
  export interface DefaultContext {
    token?: string;
    email?: string;
  }
}

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3001/graphql'
  })
);

const authLink = setContext(async (_, { headers, token, email }) => {
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(email ? { email } : {})
    }
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

function makeClient() {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: splitLink
  });
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <UpdateAuth>{children}</UpdateAuth>
    </ApolloNextAppProvider>
  );
}

function UpdateAuth({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const apolloClient = useApolloClient();

  apolloClient.defaultContext.token = session?.accessToken;
  apolloClient.defaultContext.email = String(session?.user?.email);

  return children;
}
