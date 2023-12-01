import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  profile: boolean;
  newConversation: boolean;
}

const initialState: ModalState = {
  profile: false,
  newConversation: false
};

export type ModalType = keyof typeof initialState;

export const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<ModalType>) => {
      state[action.payload] = !state[action.payload];
    }
  }
});

export const { toggleModal } = modal.actions;

export default modal.reducer;
