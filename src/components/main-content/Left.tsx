'use client';
import React from 'react';
import LeftHeader from '../LeftHeader';
import SearchInput from '../SearchInput';
import Conversation from '../Conversation';
import ProfileModal from '../modals/ProfileModal';
import NewConversationModal from '../modals/NewConversationModal';
import gql from 'graphql-tag';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Recipient, conversation } from '@/redux/features/conversationSlice';

interface Message {
  _id: string;
  content: string;
  type: string;
}

interface Conversation {
  _id: string;
  lastMessage: Message;
  recipient: Recipient;
}

const query = gql`
  query AllMyConversations {
    allMyConversations {
      _id
      lastMessage {
        _id
        content
        type
      }
      recipient {
        displayName
        picture
        email
      }
    }
  }
`;

const Left = () => {
  const { data } = useSuspenseQuery(query) as {
    data: { allMyConversations: Conversation[] };
  };

  return (
    <div className="flex flex-col w-1/3 border-l border-slate-800 relative">
      <LeftHeader />
      <SearchInput />
      <div className="overflow-y-auto">
        {data?.allMyConversations.map((conversation) => {
          const { _id: id, recipient, lastMessage } = conversation;
          return (
            <Conversation
              key={id}
              id={id}
              recipient={recipient}
              lastMessage={{
                content: lastMessage.content,
                createdAt: lastMessage.type
              }}
            />
          );
        })}
      </div>

      <ProfileModal />
      <NewConversationModal />
    </div>
  );
};

export default Left;
