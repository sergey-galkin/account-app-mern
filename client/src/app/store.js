import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import newTodoWindowReducer from '../components/features/ModalChildren/NewTodoWindow/newTodoWindowSlice';
import tableReducer from '../components/features/Table/tableSlice';
import modalReducer from '../components/features/Modal/modalSlice';
import LoginWindowReducer from '../components/features/ModalChildren/LoginWindow/LoginWindowSlice';
import editTodoWindowReducer from '../components/features/ModalChildren/EditTodoWindow/editTodoWindowSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    newTodoWindow: newTodoWindowReducer,
    editTodoWindow: editTodoWindowReducer,
    loginWindow: LoginWindowReducer,
    table: tableReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleWare => 
    getDefaultMiddleWare().concat(apiSlice.middleware)
});
