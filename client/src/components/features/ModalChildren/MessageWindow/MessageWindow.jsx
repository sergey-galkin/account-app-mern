import React from 'react';
import css from './MessageWindow.module.css'
import Button from '../../../common/Button/Button';

const MessageWindow = ({ message, closeModal, showButton }) => {
  return (
    <>
      <div>{message}</div>
      {showButton && <Button caption={'Close'} handleClick={closeModal} classesArr={[css.btn]} />}
    </>
  )
}

export default MessageWindow