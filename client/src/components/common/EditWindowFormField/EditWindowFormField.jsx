import React from 'react';
import css from './EditWindowFormField.module.css';
import Checkbox from '../Checkbox/Checkbox';

const EditWindowFormField = React.memo(({type, id, disabled, value, onChange}) => {

  const field = type === 'checkbox'
    ? <Checkbox id={id} checked={value} onChange={onChange} />
    : <>
        <div className={css.caption}>{id}</div>
        <input 
          disabled={disabled}
          className={css.field} type={type} id={id} value={value} onChange={disabled ? null: onChange}
        />
      </>
  ;

  return (
    <div className={css.fildHolder}>
      {field}
    </div>
  );
})

export default EditWindowFormField;
