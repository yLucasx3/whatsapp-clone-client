import { Left, Right } from '@/components/main-content';
import React from 'react';

const Home = () => {
  return (
    <main className="flex h-full px-40 py-5 overflow-y-hidden bg-dark-level-1">
      <div className="flex w-full bg-dark-level-2">
        <Left />
        <Right />
      </div>
    </main>
  );
};

export default Home;
