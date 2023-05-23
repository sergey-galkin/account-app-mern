import React from 'react';
import css from './ContentHolder.module.css';

const ContentHolder = ({ classesArr = [], children }) => {
  classesArr.push(css.contentHolder);
  return (
    <div className={classesArr.join(' ')}>
      {children}
    </div>
  )
}

export default ContentHolder