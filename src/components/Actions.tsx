'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/hooks';

interface Message {
  _id: string;
  content: string;
  type: string;
  status: string;
  sender: string;
  recipient: string;
  conversation: string;
}

const mutation = gql`
  mutation SendMessage(
    $type: String!
    $content: String!
    $sender: String!
    $recipient: String!
    $conversation: String!
    $status: String!
  ) {
    sendMessage(
      type: $type
      content: $content
      sender: $sender
      recipient: $recipient
      conversation: $conversation
      status: $status
    ) {
      _id
      content
      type
      status
      sender
      recipient
      conversation
    }
  }
`;

const Actions = () => {
  const [message, setMessage] = useState('');

  const currentConversation = useAppSelector(
    (state) => state.conversationReducer
  );

  const { data: dataSession } = useSession();

  const [sendMessageMutation, { data, loading, error }] = useMutation(mutation);

  const sendMessage = () => {
    if (dataSession && dataSession.user) {
      sendMessageMutation({
        variables: {
          type: 'text',
          content: message,
          sender: dataSession.user.email,
          recipient: currentConversation.recipient.email,
          conversation: currentConversation.currentConversation,
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
