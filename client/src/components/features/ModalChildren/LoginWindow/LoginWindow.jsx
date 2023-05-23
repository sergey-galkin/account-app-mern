import React, { useCallback, useMemo } from 'react';
import css from './LoginWindow.module.css';
import Button from '../../../common/Button/Button';
import MessageWindow from '../MessageWindow/MessageWindow';
import FormField from '../../../common/FormField/FormField';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthenticationMutation } from '../../../../api/authApiSlice';
import { resetCredentials, resetChecks, setCredentials, setChecks, setMessage } from './LoginWindowSlice';

const fields = [
  {
    id: 'login',
    type: 'text',
    placeholder: 'Login',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Password',
  },
];

const LoginWindow = ({ closeModal }) => {
  const [auth] = useAuthenticationMutation();
  const dispatch = useDispatch();
  const { message, credentials, checks} = useSelector((state) => state.loginWindow);

  const handleFormFieldChange = useCallback((e) => {
    const { id, value } = e.target;
    dispatch(setCredentials({id, value}));
  }, []);

  const closeModalAndResetState = useCallback(() => {
    dispatch(setMessage(''));
    dispatch(resetCredentials());
    dispatch(resetChecks());
    closeModal();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(resetChecks());
    dispatch(setMessage('In progress...'));
    
    auth(credentials).unwrap()
      .then(res => {
        if (res.status) {
          closeModalAndResetState();
        } else {
          dispatch(setChecks(res.checks));
          dispatch(setMessage(''));
        }
      })
      .catch((err) => {
        dispatch(setMessage('Something went wrong'));
        dispatch(resetCredentials());
        dispatch(resetChecks());
      })
    ;
  }

  const formFields = useMemo(
    () => fields.map((f) => (
      <FormField {...f} key={f.id}
        value={credentials[f.id]}
        onChange={handleFormFieldChange}
        warning={!checks[f.id]}
      />
    ))
  , [credentials, checks]);

  return (
    <>
      {message 
        ? <MessageWindow message={message} showButton={message !== 'In progress...'} closeModal={closeModalAndResetState} />
        : (
          <form className={css.form} onSubmit={handleFormSubmit}>
            {formFields}
            <div className={css.btnsHolder}>
              <Button caption={'Add'} handleClick={null} type={'submit'} />
              <Button caption={'Cancel'} handleClick={closeModalAndResetState} classesArr={[css.cancelBtn]}/>
            </div>
          </form>
        )
      }
    </>
  );
}

export default LoginWindow;
