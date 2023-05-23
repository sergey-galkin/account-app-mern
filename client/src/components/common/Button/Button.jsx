import React, { memo } from 'react';
import css from './Button.module.css';

const Button = memo(({ classesArr = [], caption, handleClick, ...restProps}) => {
  classesArr.push(css.btn);
  return (
    <button className={classesArr.join(' ')} onClick={handleClick} {...restProps}>{caption}</button>
  )
})

export default Button