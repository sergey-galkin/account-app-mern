import React from 'react';
import css from './NotFound.module.css';
import PageTemplate from '../../common/PageTemplate/PageTemplate';
import H1 from '../../common/H1/H1';

const NotFound = () => {
  return (
    <PageTemplate classesArr={[css.template]}>
      <H1 classesArr={[css.text]}>404 Not Found</H1>
    </PageTemplate>
  );
}

export default NotFound;
