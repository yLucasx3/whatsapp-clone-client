import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import messageReducer from './features/messageSlice';
import modalReducer from './features/modalSlice';

export const store = configureStore({
  reducer: {
    counterReducer,
    messageReducer,
    modalReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
