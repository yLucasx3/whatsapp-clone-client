import { Message } from '@/redux/features/conversationSlice';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const SEND_MESSAGE = gql`
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
      status
    }
  }
`;

export const sendMessageMutation = () => {
  const [mutate, { data, loading, error }] = useMutation(SEND_MESSAGE, {
    fetchPolicy: 'no-cache'
  });

  return {
    mutate,
    message: data?.sendMessage as Message,
    loading,
    error
  };
};
