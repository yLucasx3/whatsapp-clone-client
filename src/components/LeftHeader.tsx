import React from 'react';
import Image from 'next/image';
import Icon from './Icon';

const LeftHeader = () => {
  return (
    <div className="flex h-14 items-center px-4 py-3 justify-between bg-dark-level-4">
      <Image
        src="/profile.enc"
        width={24}
        height={24}
        alt="profile picture"
        className="h-10 w-10 rounded-full cursor-pointer"
      />
      <div className="flex gap-3">
        <Icon name="group" alt="New Group" />
        <Icon name="status" alt="New Status" />
        <Icon name="channel" alt="New Channel" />
        <Icon name="new-chat" alt="New Chat" />
        <Icon name="options" alt="More Options" />
      </div>
    </div>
  );
};

export default LeftHeader;
