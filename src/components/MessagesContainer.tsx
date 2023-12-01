'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useSubscription } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import gql from 'graphql-tag';
import { useSession } from 'next-auth/react';
import { Message } from './main-content/Right';

interface MessageProps {
  content: string;
  sender: string;
  createdAt: string;
}

const messagesColor = {
  receiver: '#202c33',
  sender: '#005c4b'
};

const Message = ({ content, sender, createdAt }: MessageProps) => {
  const { data: session } = useSession();

  const currentUser = session?.user?.email;

  return (
    <span
      className={`p-2 text-sm font-light rounded-md mb-1 max-w-md text-white ${
        sender === currentUser ? 'self-end' : 'justify-self-start'
      }`}
      style={{
        background:
          sender === currentUser ? messagesColor.sender : messagesColor.receiver
      }}>
      <div className="flex justify-between gap-2">
        {content}
        <span className="text-xs self-end">{createdAt}</span>
      </div>
    </span>
  );
};

const NEW_MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription {
    onNewMessageSent {
      content
      conversation
      sender
      recipient
      createdAt
    }
  }
`;

const MessagesContainer = ({
  initialMessages
}: {
  initialMessages: Message[];
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const { data: subscriptionData } = useSubscription(
    NEW_MESSAGE_SENT_SUBSCRIPTION,
    {
      // variables: { conversationId },
      fetchPolicy: 'no-cache'
    }
  );

  const newMessage = subscriptionData?.onNewMessageSent;

  useEffect(() => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
    }
  }, [newMessage]);

  return (
    <div className="w-full h-full bg-[url('/background-messages.png')] invert bg-contain overflow-y-auto px-8">
      <div className="flex flex-col invert">
        {messages.map((message: any) => (
          <Message
            key={message._id}
            content={message.content}
            sender={message.sender}
            createdAt={message.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesContainer;
