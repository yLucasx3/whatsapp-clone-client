'use client';
import React from 'react';
import MessagesContainer from './messages-container';
import { useAppSelector } from '@/redux/hooks';
import { getConversationMessages } from './gql.requests';
import RightHeader from './right-header';
import Actions from './actions';

const Right = () => {
  const currentConversation = useAppSelector(
    (state) => state.conversationReducer.conversation
  );

  const initialMessages = currentConversation
    ? getConversationMessages(currentConversation)
    : [];

  return (
    <div className="flex flex-col w-2/3 bg-dark-level-2">
      <RightHeader />
      <MessagesContainer initialMessages={initialMessages} />
      <Actions />
    </div>
  );
};

export default Right;
