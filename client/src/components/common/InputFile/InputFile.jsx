import React, { useState } from 'react';
import css from './InputFile.module.css';

const placeholder = 'Choose photo (max 1MB)';

const InputFile = React.memo(({warning, id, options, onChange, ...props}) => {
  const [text, setText] = useState(placeholder);
  
  const handleFileChoosing = (e) => {
    setText(e.target.files[0]?.name || placeholder)
    onChange(e);
  }
  
  const fieldClasses = [css.field];
  if (text !== placeholder) fieldClasses.push(css.chosen)

  return (
    <label className={css.fieldHolder}>
      {warning &&
        <div className={css.warning}>{warning}</div>
      }
      <div className={fieldClasses.join(' ')}>
        {text}
        <input id={id} type="file" onChange={handleFileChoosing} {...props}/>
      </div>
    </label>
  );
})

export default InputFile;
