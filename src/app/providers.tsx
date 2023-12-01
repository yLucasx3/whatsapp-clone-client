'use client';
import React from 'react';
import { store } from '../redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from './lib/apollo/apollo-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider>
        <ReduxProvider store={store}>{children}</ReduxProvider>;
      </ApolloProvider>
    </SessionProvider>
  );
}
