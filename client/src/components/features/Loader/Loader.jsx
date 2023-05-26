import React, { useEffect, useState } from 'react';
import css from './Loader.module.css'
import PageTemplate from '../../common/PageTemplate/PageTemplate';
import H1 from '../../common/H1/H1';

const colors = [css.light, css.dark];

const Loader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % 2);
    }, 1000)
    return () => {
      clearInterval(id);
    }
  }, []);

  return (
    <PageTemplate classesArr={[css.container]}>
      <H1 classesArr={[css.text, colors[index]]}>Loading...</H1>
    </PageTemplate>
  )
}

export default Loader