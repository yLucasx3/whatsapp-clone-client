'use client';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const Login = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    redirect('/');
  }

  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen bg-dark-level-1 text-white gap-4">
      <span className="text-white">Welcome to zapzap</span>

      <button
        onClick={() =>
          signIn('google', { callbackUrl: 'http://localhost:3000/' })
        }
        className="bg-red-600 text-white p-4 rounded-full">
        Sign in with google
      </button>
    </main>
  );
};

export default Login;
