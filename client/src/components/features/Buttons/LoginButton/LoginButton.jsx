import React, { useMemo } from 'react';
import Button from '../../../common/Button/Button';
import { createPortal } from 'react-dom';
import Modal from '../../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../Modal/modalSlice';
import LoginWindow from '../../ModalChildren/LoginWindow/LoginWindow';

const modalOwner = 'login';

const LoginButton = () => {
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
      <Button caption={'Login'} handleClick={modalHandlers.open} />
      {modal.owner === modalOwner && createPortal(
        <Modal header={'Login'} closeModal={modalHandlers.close}>
          <LoginWindow closeModal={modalHandlers.close} />
        </Modal>,
        document.body
      )}
    </>
  )
}

export default LoginButton