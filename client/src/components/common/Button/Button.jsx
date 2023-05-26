import React, { memo } from 'react';
import css from './Button.module.css';

const cssTypes = {
  positive: css.positive,
  negative: css.negative,
}

const Button = memo(({ classesArr = [], kind = 'positive', ...restProps}) => {
  classesArr.push(css.btn, cssTypes[kind]);
  
  return (
    <button className={classesArr.join(' ')} {...restProps} />
  )
})

export default Button