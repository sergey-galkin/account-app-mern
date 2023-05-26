import React from 'react'
import css from './Form.module.css'

const Form = ({ classesArr = [], ...props }) => {
  classesArr.push(css.form);

  return (
    <form className={classesArr.join(' ')} {...props} />
  )
}

export default Form