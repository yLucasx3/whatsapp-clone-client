'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/hooks';
import { sendMessageMutation } from './gql.requests';
import Image from 'next/image';

const Actions = () => {
  const [message, setMessage] = useState('');

  const currentConversation = useAppSelector(
    (state) => state.conversationReducer
  );

  const { data: session } = useSession();

  const { mutate } = sendMessageMutation();

  const sendMessage = () => {
    if (session && session.user) {
      const { conversation, recipient } = currentConversation;

      mutate({
        variables: {
          type: 'text',
          content: message,
          sender: session.user.email,
          recipient: recipient.email,
          conversation: conversation,
          status: 'sent'
        }
      });
    }

    setMessage('');
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex py-4 px-4 gap-4 bg-dark-level-2">
      <Image src="/icons/smile.svg" alt="Emojis" width={28} height={28} />
      <Image src="/icons/plus.svg" alt="New Action" width={28} height={28} />

      <form className="w-full" onSubmit={handleSubmit}>
        <input
          className="w-full h-9 rounded-lg pl-6 text-sm text-slate-400 outline-none bg-dark-level-5"
          placeholder="Type a message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}></input>
      </form>

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
