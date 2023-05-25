import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import modalReducer from '../components/features/Modal/modalSlice';
// import indexPageReducer from '../components/Pages/Index/indexPageSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
    // indexPage: indexPageReducer,
  },
  middleware: getDefaultMiddleWare => 
    getDefaultMiddleWare().concat(apiSlice.middleware)
});
