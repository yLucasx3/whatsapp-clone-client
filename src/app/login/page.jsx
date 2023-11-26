'use client';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

const Login = () => {

  const { data: session } = useSession();

  console.log(session);

  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen bg-dark-level-1 text-white gap-4">
      <span className="text-white">Welcome to zapzap</span>

      {session?.user && <span>inhae {session.user.name}</span>}
      {!session?.user && <button onClick={() => signIn()}>Sign in with google</button>}
      
    </main>
  );
};

export default Login;
