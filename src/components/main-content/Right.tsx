import React from 'react';
import RightHeader from '../RightHeader';
import Messages from '../Messages';
import Actions from '../Actions';

const Right = () => {
  return (
    <div className="flex flex-col w-2/3 bg-dark-level-2">
      <RightHeader />
      <Messages />
      <Actions />
    </div>
  );
};

export default Right;
