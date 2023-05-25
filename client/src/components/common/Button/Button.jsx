import React, { memo } from 'react';
import css from './Button.module.css';

const Button = memo(({ classesArr = [], ...restProps}) => {
  classesArr.push(css.btn);
  return (
    <button className={classesArr.join(' ')} {...restProps} />
  )
})

export default Button