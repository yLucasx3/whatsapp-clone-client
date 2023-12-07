import { gql, useMutation, useSubscription } from '@apollo/client';

const NEW_MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription {
    onNewMessageSent {
      _id
      content
      conversation
      sender
      recipient
      createdAt
      recipientDetails {
        displayName
        email
        picture
      }
      conversationDetails {
        lastMessage {
          _id
          content
          type
          createdAt
        }
      }
    }
  }
`;

const SET_STATUS_MESSAGES_TO_READ = gql`
  mutation SetStatusMessagesToRead($messages: [String!]!, $status: String!) {
    setMessagesStatus(messages: $messages, status: $status)
  }
`;

export const subscribeToConversation = () => {
  const { data, loading, error } = useSubscription(
    NEW_MESSAGE_SENT_SUBSCRIPTION,
    {
      fetchPolicy: 'no-cache'
    }
  );

  return {
    newMessage: data?.onNewMessageSent,
    loading,
    error
  };
};

export const setMessagesStatusToReadMutation = () => {
  const [mutate, { loading, error }] = useMutation(
    SET_STATUS_MESSAGES_TO_READ,
    { fetchPolicy: 'no-cache' }
  );

  return {
    mutate,
    loading,
    error
  };
};
