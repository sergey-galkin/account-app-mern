import React, { useMemo } from 'react';
import Button from '../../../common/Button/Button';
import { createPortal } from 'react-dom';
import Modal from '../../Modal/Modal';
import NewTodoWindow from '../../ModalChildren/NewTodoWindow/NewTodoWindow';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../Modal/modalSlice';

const modalOwner = 'newTodo';

const NewTodoButton = ({  }) => {
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const modalHandlers = useMemo(() => {
    return {
      open: () => dispatch(open(modalOwner)),
      close: () => dispatch(close())
    }
  }, [])

  return (
    <>
      <Button caption={'New Todo'} handleClick={modalHandlers.open} />
      {modal.owner === modalOwner && createPortal(
        <Modal header={'Create New Todo'} closeModal={modalHandlers.close}>
          <NewTodoWindow closeModal={modalHandlers.close} />
        </Modal>,
        document.body
      )}
    </>
  )
}

export default NewTodoButton