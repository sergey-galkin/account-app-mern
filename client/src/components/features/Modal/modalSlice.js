import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    owner: null,
  },
  reducers: {
    open(state, action) {
      state.owner = action.payload;
    },
    close(state) {
      state.owner = null;
    },
  },
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;