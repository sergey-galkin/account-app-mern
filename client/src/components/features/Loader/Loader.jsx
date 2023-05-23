import React from 'react';
import css from './Loader.module.css'

const Loader = () => {
  return (
    <div className={css.container}>
      <h1 className={css.header}>Loading...</h1>
    </div>
  )
}

export default Loader