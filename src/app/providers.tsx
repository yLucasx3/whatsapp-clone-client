'use client';
import React from 'react';
import { store } from '../redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { mainGqlClient } from '@/helpers/gql.setup';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={mainGqlClient}>
        <ReduxProvider store={store}>{children}</ReduxProvider>;
      </ApolloProvider>
    </SessionProvider>
  );
}
