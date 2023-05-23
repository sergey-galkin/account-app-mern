import React from 'react';
import css from './LogoutButton.module.css';
import Button from '../../../common/Button/Button';
import { useLogoutMutation } from '../../../../api/authApiSlice';

const LogoutButton = () => {
  const [logout] = useLogoutMutation();

  return (
    <Button classesArr={[css.btn]} caption={'Logout'} handleClick={logout} />
  )
}

export default LogoutButton