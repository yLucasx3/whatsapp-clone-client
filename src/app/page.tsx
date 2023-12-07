'use client';
import React from 'react';
import Left from '@/components/left';
import Right from '@/components/right';
import { useAppSelector } from '@/redux/hooks';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Home = () => {
  const recipient = useAppSelector(
    (state) => state.conversationReducer.recipient
  );

  const { data: session, status } = useSession();

  if (status == 'unauthenticated') {
    redirect('/login');
  }

  return (
    <main className="flex h-full px-40 py-5 overflow-y-hidden bg-dark-level-1">
      {session && (
        <div className="flex w-full bg-dark-level-2">
          <Left />
          {recipient.displayName && <Right />}
        </div>
      )}
    </main>
  );
};

export default Home;
