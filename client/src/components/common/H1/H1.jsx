import React from 'react'
import css from './H1.module.css'

const H1 = ({ classesArr = [], children }) => {
  classesArr.push(css.header);
  return (
    <h1 className={classesArr.join(' ')}>{children}</h1>
  )
}

export default H1