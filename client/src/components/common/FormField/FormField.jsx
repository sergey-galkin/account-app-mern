import React from 'react';
import css from './FormField.module.css';

const FormField = React.memo(({type, id, placeholder, value, onChange, warning}) => {
  return (
    <label className={css.fildHolder}>
      {warning &&
        <div className={css.warning}>{'Check data in this field'}</div>
      }
      <input 
        autoFocus={ id === 'name' ? true : false}
        className={css.fild} type={type} id={id} placeholder={placeholder} value={value} onChange={onChange}
      />
    </label>
  );
})

export default FormField;
