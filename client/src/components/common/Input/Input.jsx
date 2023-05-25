import React from 'react';
import css from './Input.module.css';

const Input = React.memo(({warning, id, ...props}) => {
  return (
    <label className={css.fieldHolder}>
      {warning &&
        <div className={css.warning}>{warning}</div>
      }
      <input 
        autoFocus={ id === 'name' ? true : false}
        id={id} className={css.field} {...props}
      />
    </label>
  );
})

export default Input;
