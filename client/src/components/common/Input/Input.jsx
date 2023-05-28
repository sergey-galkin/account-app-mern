import React from 'react';
import css from './Input.module.css';
import Warning from '../Warning/Warning';

const Input = React.memo(({warning, id, ...props}) => {
  return (
    <label className={css.fieldHolder}>
      {warning && <Warning warning={warning} />}
      <input 
        autoFocus={ id === 'name' ? true : false}
        id={id} className={css.field} {...props}
      />
    </label>
  );
})

export default Input;
