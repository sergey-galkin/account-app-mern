import React from 'react';
import css from './Loader.module.css'
import PageTemplate from '../../common/PageTemplate/PageTemplate';

const Loader = () => {
  return (
    <PageTemplate classesArr={[css.container]} header={'Loading...'} />
  )
}

export default Loader