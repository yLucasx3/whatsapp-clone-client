'use client';
import { Left, Right } from '@/components/main-content';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Home = () => {
  const currentConversation = useAppSelector(
    (state) => state.conversationReducer.currentConversation
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
          {currentConversation && <Right />}
        </div>
      )}
    </main>
  );
};

export default Home;
