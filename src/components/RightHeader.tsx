import React from 'react';
import Image from 'next/image';
import Icon from './Icon';

const RightHeader = () => {
  return (
    <div className="flex h-14 items-center px-4 py-3 justify-between bg-dark-level-4 border-l border-slate-700">
      <div className="flex items-center gap-4 w-full cursor-pointer">
        <Image
          src="/profile.enc"
          width={24}
          height={24}
          alt="profile picture"
          className="h-10 w-10 rounded-full "
        />
        <div className="flex flex-col">
          <span className="bold text-white">Luska</span>
          <span className="text-xs text-slate-400">
            click to show contact details
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <Icon name="search" alt="Search messages" />
        <Icon name="options" alt="More options" />
      </div>
    </div>
  );
};

export default RightHeader;
