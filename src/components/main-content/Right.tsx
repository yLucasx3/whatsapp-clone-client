'use client';

import React from 'react';
import RightHeader from '../RightHeader';
import Actions from '../Actions';
import MessagesContainer from '../MessagesContainer';
import gql from 'graphql-tag';
import { useAppSelector } from '@/redux/hooks';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

export interface Message {
  _id: string;
  content: string;
  status: string;
  sender: string;
  recipient: string;
  createdAt: string;
}

const query = gql`
  query ConversationById($id: String!) {
    conversationById(id: $id) {
      allMessages {
        _id
        content
        sender
        status
        createdAt
      }
    }
  }
`;

const Right = () => {
  const currentConversation = useAppSelector(
    (state) => state.conversationReducer.currentConversation
  );

  console.log(currentConversation);

  const { data } = useSuspenseQuery(query, {
    variables: { id: currentConversation }
  }) as { data: { conversationById: { allMessages: Message[] } } };

  const initialMessages = data.conversationById.allMessages;
  return (
    <div className="flex flex-col w-2/3 bg-dark-level-2">
      <RightHeader />
      {initialMessages && (
        <MessagesContainer initialMessages={initialMessages} />
      )}
      <Actions />
    </div>
  );
};

export default Right;
