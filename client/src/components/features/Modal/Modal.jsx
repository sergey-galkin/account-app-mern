import * as React from 'react';
import css from './Modal.module.css';

const Modal = ({ header, children, closeModal }) => {
  return (
    <div className={css.modalContainer} onClick={closeModal} >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.contentHolder}>
          <h1 className={css.header}>{header}</h1>
          <div className={css.childrenContainer}>
            { children }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
