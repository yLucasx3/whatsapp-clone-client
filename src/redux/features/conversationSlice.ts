import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Recipient {
  email: string;
  displayName: string;
  picture: string;
}

interface ConversationState {
  currentConversation: string | undefined;
  recipient: Recipient;
}

const initialState: ConversationState = {
  currentConversation: undefined,
  recipient: {
    email: '',
    displayName: '',
    picture: ''
  }
};

export const conversation = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<string>) => {
      state.currentConversation = action.payload;
    },
    setConversation: (state, action: PayloadAction<ConversationState>) => {
      state.currentConversation = action.payload.currentConversation;
      state.recipient = action.payload.recipient;
    }
  }
});

export const { setCurrentConversation, setConversation } = conversation.actions;

export default conversation.reducer;
