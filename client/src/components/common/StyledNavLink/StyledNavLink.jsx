import React from 'react'
import css from './StyledNavLink.module.css'
import { NavLink } from 'react-router-dom'

const StyledNavLink = ({ classesArr = [], to, children }) => {
  classesArr.push(css.navLink);

  const setClasses = ({ isActive }) => {
    let activeClass = '';
    if (isActive) activeClass = css.active;
    
    return classesArr.join(' ') + ' ' + activeClass;
  }

  return (
    <NavLink to={to} className={setClasses}>{children}</NavLink>
  )
}

export default StyledNavLink