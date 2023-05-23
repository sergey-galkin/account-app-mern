import { createSlice } from '@reduxjs/toolkit';

const getInitialState = (initialValue) => {
  return {
    name: initialValue,
    email: initialValue,
    task: initialValue,
    completed: initialValue,
  }
};

const editTodoWindowSlice = createSlice({
  name: 'newTodoWindow',
  initialState: {
    message: '',
    editedTodo: getInitialState(''),
  },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
    setEditedTodo(state, action) {
      state.editedTodo = action.payload;
    },
    setEditedTodoField(state, action) {
      const { id, value } = action.payload;
      state.editedTodo[id] = value;
    },
    resetEditedTodo(state) {
      state.editedTodo = getInitialState('');
    },
  },
});

export const { setMessage, setEditedTodo, setEditedTodoField, resetEditedTodo } = editTodoWindowSlice.actions;
export default editTodoWindowSlice.reducer;