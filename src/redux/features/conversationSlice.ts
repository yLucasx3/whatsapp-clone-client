import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  _id: string;
  content: string;
  status: string;
  sender: string;
  recipient: string;
  createdAt: string;
}

export type MessageWithoutId = Omit<Message, '_id'>;

export interface Recipient {
  email: string;
  displayName: string;
  picture: string;
}

interface ConversationState {
  conversation: string | undefined;
  recipient: Recipient;
  messages: Message[];
}

const initialState: ConversationState = {
  conversation: undefined,
  recipient: {
    email: '',
    displayName: '',
    picture: ''
  },
  messages: []
};

export const conversation = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setCurrentConversation: (
      state,
      action: PayloadAction<Omit<ConversationState, 'messages'>>
    ) => {
      const { conversation, recipient } = action.payload;

      state.conversation = conversation;
      state.recipient = recipient;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload];
    }
  }
});

export const { setCurrentConversation, setMessages, addMessage } =
  conversation.actions;

export default conversation.reducer;
