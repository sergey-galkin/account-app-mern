import { createSlice } from '@reduxjs/toolkit';

const getInitialState = (initialValue) => {
  return {
    login: initialValue,
    password: initialValue,
  }
};

const loginWindowSlice = createSlice({
  name: 'loginWindow',
  initialState: {
    credentials: getInitialState(''),
    checks: getInitialState(true),
  },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
    setCredentials(state, action) {
      const { id, value } = action.payload;
      state.credentials[id] = value;
    },
    resetCredentials(state) {
      state.credentials = getInitialState('');
    },
    setChecks(state, action) {
      state.checks = action.payload;
    },
    resetChecks(state) {
      state.checks = getInitialState(true);
    },
  },
});

export const { setMessage, setCredentials, resetCredentials, setChecks, resetChecks } = loginWindowSlice.actions;
export default loginWindowSlice.reducer;