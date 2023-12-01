'use client';
import React from 'react';
import Image from 'next/image';
import Icon from './icon';
import MultActions, { type Action } from './MultActions';
import { useAppSelector } from '@/redux/hooks';

const RightHeader = () => {
  const currentConversation = useAppSelector(
    (state) => state.conversationReducer
  );

  const actions: Action[] = [
    {
      name: 'Novo Grupo',
      handleSelect: () => {}
    },
    { name: 'User data', handleSelect: () => {} },
    { name: 'Select messages', handleSelect: () => {} },
    { name: 'Close conversation', handleSelect: () => {} },
    { name: 'Mute notifications', handleSelect: () => {} },
    { name: 'Temporary messages', handleSelect: () => {} },
    { name: 'Clear conversation', handleSelect: () => {} },
    { name: 'Delete conversation', handleSelect: () => {} },
    { name: 'Report', handleSelect: () => {} },
    { name: 'Block', handleSelect: () => {} }
  ];

  return (
    <div className="flex h-14 items-center px-4 py-3 justify-between bg-dark-level-4 border-l border-slate-700">
      <div className="flex items-center gap-4 cursor-pointer">
        <Image
          src={currentConversation.recipient.picture}
          width={24}
          height={24}
          alt="profile picture"
          className="h-10 w-10 rounded-full "
        />
        <div className="flex flex-col">
          <span className="bold text-white">
            {currentConversation.recipient.displayName}
          </span>
          <span className="text-xs text-slate-400">
            click to show contact details
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <Icon name="search" alt="Search messages" />
        <MultActions actions={actions} />
      </div>
    </div>
  );
};

export default RightHeader;
