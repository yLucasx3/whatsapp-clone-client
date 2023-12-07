'use client';
import React from 'react';
import Image from 'next/image';
import Icon from '@/components/icon';
import MultActions, { Action } from '@/components/mult-actions';
import { useAppDispatch } from '@/redux/hooks';
import { toggleModal } from '@/redux/features/modalSlice';
import { signOut, useSession } from 'next-auth/react';

const LeftHeader = () => {
  const actions: Action[] = [
    { name: 'New Group', handleSelect: () => {} },
    { name: 'New community', handleSelect: () => {} },
    { name: 'Favorite messages', handleSelect: () => {} },
    { name: 'Mute conversations', handleSelect: () => {} },
    { name: 'Settings', handleSelect: () => {} },
    {
      name: 'Disconnect',
      handleSelect: () => {
        signOut({
          redirect: true,
          callbackUrl: 'http://localhost:3000/login'
        });
      }
    }
  ];

  const dispatch = useAppDispatch();

  const { data } = useSession();

  return (
    <div className="flex h-14 items-center px-4 py-3 justify-between bg-dark-level-4">
      <div
        onClick={() => dispatch(toggleModal('profile'))}
        className="transition-all duration-300">
        <Image
          src={data?.user?.image || ''}
          width={24}
          height={24}
          alt="profile picture"
          className="h-10 w-10 rounded-full cursor-pointer"
        />
      </div>
      <div className="flex gap-3">
        <Icon name="group" alt="New Group" />
        <Icon name="status" alt="New Status" />
        <Icon
          name="new-chat"
          alt="New Chat"
          handleClick={() => dispatch(toggleModal('newConversation'))}
        />
        <MultActions actions={actions} />
      </div>
    </div>
  );
};

export default LeftHeader;
