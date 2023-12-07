import { Recipient } from '@/redux/features/conversationSlice';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import gql from 'graphql-tag';

interface Message {
  _id: string;
  content: string;
  type: string;
  createdAt: Date;
}

export interface Conversation {
  _id: string;
  lastMessage: Message;
  recipient: Recipient;
  unreadMessages: Message[];
}

const GET_ALL_MY_CONVERSATIONS = gql`
  query AllMyConversations {
    allMyConversations {
      _id
      lastMessage {
        _id
        content
        type
        createdAt
      }
      recipient {
        displayName
        picture
        email
      }
      unreadMessages {
        content
        type
        createdAt
      }
    }
  }
`;

export const getAllMyConversations = () => {
  const { data, refetch } = useSuspenseQuery<{
    allMyConversations: Conversation[];
  }>(GET_ALL_MY_CONVERSATIONS, {
    fetchPolicy: 'no-cache'
  });

  return {
    conversations: data?.allMyConversations,
    refetch
  };
};
