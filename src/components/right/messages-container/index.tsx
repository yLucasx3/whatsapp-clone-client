'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Message } from '@/redux/features/conversationSlice';
import {
  setMessagesStatusToReadMutation,
  subscribeToConversation
} from './gql.requests';

interface MessageProps {
  content: string;
  sender: string;
  createdAt: string;
}

const messagesColor = {
  receiver: '#202c33',
  sender: '#005c4b'
};

const MessageItem = ({ content, sender, createdAt }: MessageProps) => {
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

const MessagesContainer = ({
  initialMessages
}: {
  initialMessages: Message[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { mutate } = setMessagesStatusToReadMutation();

  useEffect(() => {
    if (initialMessages.length) {
      mutate({
        variables: {
          messages: initialMessages.map(({ _id }) => _id),
          status: 'read'
        }
      });
    }
  }, []);

  const { newMessage } = subscribeToConversation();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollMax =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
      scrollRef.current.scrollTop = scrollMax;
    }
  };

  useEffect(() => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
    }

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [newMessage]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full bg-[url('/background-messages-invert.png')]  bg-contain overflow-y-auto px-8">
      <div className="flex flex-col ">
        {messages.map(({ _id, content, sender, createdAt }) => (
          <MessageItem
            key={_id}
            content={content}
            sender={sender}
            createdAt={createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesContainer;
