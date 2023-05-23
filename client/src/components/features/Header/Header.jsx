import React from 'react';
import css from './Header.module.css';
import ContentHolder from '../../common/ContentHolder/ContentHolder';
import { useIdentificationQuery, useLogoutMutation } from '../../../api/authApiSlice';
import StyledNavLink from '../../common/StyledNavLink/StyledNavLink';

const Header = () => {
  const { data: user } = useIdentificationQuery();
  const [ logout ] = useLogoutMutation();

  return (
    <div className={css.container}>
      <ContentHolder>
        <nav className={css.navigation}>
          <StyledNavLink to={'/'} classesArr={[css.logo]} >APP</StyledNavLink>
          <ul className={css.routes}>
            <StyledNavLink to={'/people'}>people</StyledNavLink>
            { user
              ? <StyledNavLink to={'/'} onClick={logout}>logout</StyledNavLink>
              : <StyledNavLink to={'/account'} classesArr={[css.account]}>account</StyledNavLink>
            }
          </ul>
        </nav>
      </ContentHolder>
    </div>
  )
}

export default Header