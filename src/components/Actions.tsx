'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { newMessage } from '@/redux/features/messageSlice';

const Actions = () => {
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();

  const sendMessage = () => {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();

    const currentTime = `${hour}:${min}`;

    const defaultMessage = {
      message,
      senderId: '3jk2ds8a',
      receiverId: 'gustavinho',
      time: currentTime
    };
    dispatch(newMessage(defaultMessage));

    setMessage('');
  };
  return (
    <div className="flex py-4 px-4 gap-4 bg-dark-level-2">
      <Image src="/icons/smile.svg" alt="Emojis" width={28} height={28} />
      <Image src="/icons/plus.svg" alt="New Action" width={28} height={28} />

      <input
        className="w-full h-9 rounded-lg pl-6 text-sm text-slate-400 outline-none bg-dark-level-5"
        placeholder="Type a message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}></input>

      {message.length !== 0 ? (
        <Image
          src="/icons/send.svg"
          alt="Send message"
          width={24}
          height={24}
          onClick={() => {
            sendMessage();
          }}
        />
      ) : (
        <Image
          src="/icons/microphone.svg"
          alt="New Action"
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default Actions;
