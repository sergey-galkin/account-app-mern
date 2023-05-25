import React from 'react'
import css from './H1.module.css'

const H1 = ({ children }) => {
  return (
    <h1 className={css.header}>{children}</h1>
  )
}

export default H1