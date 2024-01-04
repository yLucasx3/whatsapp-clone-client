import { Message, setMessages } from '@/redux/features/conversationSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import gql from 'graphql-tag';

const GET_CONVERSATION_MESSAGES = gql`
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

export const getConversationMessages = (id: string) => {
  const { data } = useSuspenseQuery(GET_CONVERSATION_MESSAGES, {
    variables: { id: id },
    fetchPolicy: 'no-cache'
  }) as { data: { conversationById: { allMessages: Message[] } } };

  const messages = data.conversationById.allMessages as Message[];

  return messages;
};
