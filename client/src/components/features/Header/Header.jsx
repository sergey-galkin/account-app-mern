import React, { useCallback } from 'react';
import css from './Header.module.css';
import ContentHolder from '../../common/ContentHolder/ContentHolder';
import { Link } from 'react-router-dom';
import { useIdentificationQuery, useLogoutMutation } from '../../../api/authApiSlice';

const Header = () => {
  const { data: user } = useIdentificationQuery();
  const [ logout ] = useLogoutMutation();

  return (
    <div className={css.container}>
      <ContentHolder>
        <nav className={css.navigation}>
          <Link to={'/'}>APP</Link>
          <ul className={css.routes}>
            <Link to={'/people'}>people</Link>
            { user
              ? <Link to={'/'} onClick={logout}>logout</Link>
              : <Link to={'/account'} className={css.account}>account</Link>
            }
          </ul>
        </nav>
      </ContentHolder>
    </div>
  )
}

export default Header