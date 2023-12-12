'use client';
import React, { useEffect, useState } from 'react';
import ConversationItem from './conversation-item';
import ProfileModal from '../modals/profile-modal';
import NewConversationModal from '../modals/new-conversation-modal';
import LeftHeader from './left-header';
import { getAllMyConversations } from './gql.requests';
import { subscribeToConversation } from '../right/messages-container/gql.requests';
import SearchInput from '../search-input';

const Left = () => {
  const { conversations: initialConversations, refetch } =
    getAllMyConversations();
  const [conversations, setConversations] = useState(initialConversations);

  const { newMessage } = subscribeToConversation();

  const refetchConversations = async () => {
    const { data } = await refetch();

    setConversations(data.allMyConversations);
  };

  useEffect(() => {
    if (newMessage) {
      refetchConversations();
    }
  }, [newMessage]);

  return (
    <div className="flex flex-col w-1/3 border-l border-slate-800 relative">
      <LeftHeader />
      <SearchInput />
      <div className="overflow-y-auto">
        {conversations.map((conversation) => {
          const {
            _id: id,
            recipient,
            lastMessage,
            unreadMessages
          } = conversation;
          return (
            <ConversationItem
              key={id}
              id={id}
              recipient={recipient}
              lastMessage={{
                content: lastMessage.content,
                createdAt: lastMessage.createdAt
              }}
              unreadMessages={unreadMessages.length}
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
