import React from 'react';
import css from './Footer.module.css';
import ContentHolder from '../../common/ContentHolder/ContentHolder';

const Footer = () => {
  return (
    <div className={css.container}>
      <ContentHolder classesArr={[css.content]}>
        Powered by MERN
      </ContentHolder>
    </div>
  )
}

export default Footer