import React from 'react';
import Actions from '@/components/Actions';
import Conversation from '@/components/Conversation';
import LeftHeader from '@/components/LeftHeader';
import RightHeader from '@/components/RightHeader';
import SearchInput from '@/components/SearchInput';
import Messages from '@/components/Messages';

const Home = () => {
  return (
    <main className="flex h-full px-40 py-5 overflow-y-hidden bg-dark-level-1">
      <div className="flex w-full bg-dark-level-2">
        <div className="flex flex-col w-1/3 border-l border-slate-800">
          <LeftHeader />
          <SearchInput />
          <div className="overflow-y-auto">
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="flex flex-col w-2/3 bg-dark-level-2">
          <RightHeader />
          <Messages />
          <Actions />
        </div>
      </div>
    </main>
  );
};

export default Home;
