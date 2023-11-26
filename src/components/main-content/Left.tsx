'use client';
import React from 'react';
import LeftHeader from '../LeftHeader';
import SearchInput from '../SearchInput';
import Conversation from '../Conversation';
import ProfileModal from '../modals/ProfileModal';

const Left = () => {
  return (
    <div className="flex flex-col w-1/3 border-l border-slate-800 relative">
      <LeftHeader />
      <SearchInput />
      <div className="overflow-y-auto ">
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

      <ProfileModal />
    </div>
  );
};

export default Left;
