import React from 'react';
import css from './Select.module.css';
import Warning from '../Warning/Warning';

const Select = React.memo(({warning, id, options, ...props}) => {
  return (
    <label className={css.fieldHolder}>
      {warning && <Warning warning={warning} />}
      <div className={css.field}>
        <select id={id} {...props}>
          {options.map(({value, text}) => (
            <option key={value} value={value}>{text}</option>
          ))}
        </select>
      </div>
    </label>
  );
})

export default Select;
