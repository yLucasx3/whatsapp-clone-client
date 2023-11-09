import React from 'react';
import Image from 'next/image';

const Conversation = () => {
  return (
    <div className="flex px-3 pt-4 cursor-pointer bg-dark-level-3 hover:bg-dark-level-3-opacity">
      <div className="flex justify-center items-center">
        <Image
          src="/profile.enc"
          width={49}
          height={49}
          alt="Conversation Picture"
          className="rounded-full mr-3"
        />
      </div>
      <div className="flex w-full flex-col py-4 justify-center pb-2 border-b border-slate-800">
        <div className="flex justify-between w-full pr-2 ">
          <span className="text-base text-white">
            <b>True Relegion🔥</b>
          </span>
          <span className="text-xs text-slate-400">19:31</span>
        </div>
        <div className="flex text-sm text-slate-400">
          Aleh: e você estava aonde
        </div>
      </div>
    </div>
  );
};

export default Conversation;
