import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Message {
  message: string;
  senderId: string;
  receiverId: string;
  time: string;
}

interface MessagesState {
  messages: Message[];
}

// const date = new Date();
// const hour = date.getHours();
// const min = date.getMinutes();

// const currentTime = `${hour}:${min}`;

// const defaultMessage: Message = {
//   message: '',
//   senderId: '3jk2ds8a',
//   receiverId: 'gustavinho',
//   time: currentTime
// };

const initialState: MessagesState = {
  messages: []
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    newMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload];
    }
  }
});

export const { newMessage } = messageSlice.actions;

export default messageSlice.reducer;
