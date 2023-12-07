'use client';
import React from 'react';
import Image from 'next/image';
import Icon from '@/components/icon';
import MultActions, { Action } from '@/components/mult-actions';
import { useAppSelector } from '@/redux/hooks';

const RightHeader = () => {
  const recipient = useAppSelector(
    (state) => state.conversationReducer.recipient
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

  const { picture, displayName } = recipient;

  return (
    <div className="flex h-14 items-center px-4 py-3 justify-between bg-dark-level-4 border-l border-slate-700">
      <div className="flex items-center gap-4 cursor-pointer">
        <Image
          src={picture}
          width={24}
          height={24}
          alt="profile picture"
          className="h-10 w-10 rounded-full "
        />
        <div className="flex flex-col">
          <span className="bold text-white">{displayName}</span>
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
