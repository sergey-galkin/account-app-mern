import React from 'react'
import css from './PageTemplate.module.css'
import ContentHolder from '../ContentHolder/ContentHolder'

const PageTemplate = ({ classesArr = [], children }) => {
  classesArr.push(css.container)
  return (
    <ContentHolder classesArr={classesArr} >
      {children}
    </ContentHolder>
  )
}

export default PageTemplate