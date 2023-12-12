'use client';
import React, { useEffect, useRef, useState } from 'react';
import { GroupedMessage, Message } from '@/redux/features/conversationSlice';
import {
  setMessagesStatusToReadMutation,
  subscribeToConversation
} from './gql.requests';
import { formatDate, formatWeekDate } from '@/utils/functions';
import MessageItem from './message-item';

const scrollToBottom = (scrollRef: React.RefObject<HTMLDivElement>) => {
  if (scrollRef.current) {
    const scrollMax =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    scrollRef.current.scrollTop = scrollMax;
  }
};

const MessagesContainer = ({
  initialMessages
}: {
  initialMessages: Message[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [groupedMessages, setGroupedMessages] = useState<GroupedMessage[]>([]);

  const { mutate } = setMessagesStatusToReadMutation();
  const { newMessage } = subscribeToConversation();

  const groupMessagesByDate = (messages: Message[]): GroupedMessage[] => {
    const grouped: Record<string, Message[]> = {};
    messages.forEach((message) => {
      const date = new Date(message.createdAt).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });
    return Object.keys(grouped).map((date) => ({
      date,
      messages: grouped[date]
    }));
  };

  useEffect(() => {
    scrollToBottom(scrollRef);
    if (initialMessages.length) {
      mutate({
        variables: {
          messages: initialMessages.map(({ _id }) => _id),
          status: 'read'
        }
      });
    }
  }, []);

  useEffect(() => {
    const grouped = groupMessagesByDate(messages);
    setGroupedMessages(grouped);

    setTimeout(() => {
      scrollToBottom(scrollRef);
    }, 100);
  }, [messages]);

  useEffect(() => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
    }
  }, [newMessage]);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full bg-[url('/background-messages-invert.png')] bg-contain overflow-y-auto px-8">
      {groupedMessages.map((group) => (
        <div className="flex flex-col" key={group.date}>
          <div className="sticky top-4 z-1 text-center">
            <span className="bg-dark-level-6 px-4 py-2 rounded-full text-slate-300 text-normal text-sm">
              {formatWeekDate(group.date)}
            </span>
          </div>
          {group.messages.map(({ _id, content, sender, createdAt }) => (
            <MessageItem
              key={_id}
              content={content}
              sender={sender}
              createdAt={createdAt}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MessagesContainer;
