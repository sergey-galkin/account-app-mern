import React from 'react';
import css from './Warning.module.css';

const Warning = ({ warning }) => {
  return (
    <div className={css.warning}>{warning}</div>
  )
}

export default Warning