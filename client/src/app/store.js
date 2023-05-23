import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import modalReducer from '../components/features/Modal/modalSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleWare => 
    getDefaultMiddleWare().concat(apiSlice.middleware)
});
