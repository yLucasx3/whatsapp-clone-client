import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './features/modalSlice';
import conversationReducer from './features/conversationSlice';

export const store = configureStore({
  reducer: {
    modalReducer,
    conversationReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
