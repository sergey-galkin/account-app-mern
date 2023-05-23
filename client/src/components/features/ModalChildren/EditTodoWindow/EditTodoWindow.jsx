import React, { useCallback, useMemo } from 'react';
import css from './EditTodoWindow.module.css';
import { useGetTodosQuery, useUpdateTodoMutation } from '../../../../api/todosApiSlice';
import Button from '../../../common/Button/Button';
import MessageWindow from '../MessageWindow/MessageWindow';
import { useDispatch, useSelector } from 'react-redux';
import { resetEditedTodo, setMessage, setEditedTodoField } from './editTodoWindowSlice';
import EditWindowFormField from '../../../common/EditWindowFormField/EditWindowFormField';
import { useIdentificationQuery } from '../../../../api/authApiSlice';

const fields = [
  {
    id: 'name',
    type: 'text',
    disabled: true,
  },
  {
    id: 'email',
    type: 'email',
    disabled: true,
  },
  {
    id: 'task',
    type: 'text',
    disabled: false,
  },
  {
    id: 'completed',
    type: 'checkbox',
    disabled: false,
  },
];

const EditTodoWindow = ({ closeModal }) => {
  const { refetch: reIdentify } = useIdentificationQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const params = useSelector(state => state.table);
  const { data: todosData, refetch: refetchTodos } = useGetTodosQuery(params);
  const dispatch = useDispatch();
  const { message, editedTodo } = useSelector((state) => state.editTodoWindow);

  const handleFormFieldChange = useCallback((e) => {
    let { id, value, checked } = e.target;
    if (e.target.type === 'checkbox') value = checked;
    dispatch(setEditedTodoField({id, value}));
  }, []);

  const closeModalAndResetState = useCallback(() => {
    dispatch(setMessage(''));
    dispatch(resetEditedTodo());
    closeModal();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(setMessage('In progress...'));

    const todos = todosData.todos;
    const originalTodo = todos.filter((t => t.id === editedTodo.id))[0]
    const edited = originalTodo.edited || editedTodo.task !== originalTodo.task;
    
    updateTodo({...editedTodo, edited}).unwrap()
      .then(res => {
        if (res.status) {
          dispatch(setMessage('Todo successfully edited'));
          dispatch(resetEditedTodo());
          refetchTodos();
        } else {
          dispatch(setMessage('Permission denied. Please, check your credentials.'));
          reIdentify();
        }
      })
      .catch((err) => {
        dispatch(setMessage('Something went wrong'));
        dispatch(resetEditedTodo());
      })
    ;
  }

  const formFields = useMemo(
    () => fields.map((f) => (
      <EditWindowFormField {...f} key={f.id}
        value={editedTodo[f.id]}
        onChange={handleFormFieldChange}
      />
    ))
  , [todosData, editedTodo]);

  return (
    <>
      {message 
        ? <MessageWindow message={message} showButton={message !== 'In progress...'} closeModal={closeModalAndResetState} />
        : (
          <form className={css.form} onSubmit={handleFormSubmit}>
            {formFields}
            <div className={css.btnsHolder}>
              <Button caption={'Save'} handleClick={null} type={'submit'} />
              <Button caption={'Cancel'} handleClick={closeModalAndResetState} classesArr={[css.cancelBtn]}/>
            </div>
          </form>
        )
      }
    </>
  );
}

export default EditTodoWindow;
