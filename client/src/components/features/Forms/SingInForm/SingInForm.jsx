import React, { useCallback, useMemo, useState } from 'react';
import css from './SingInForm.module.css';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import { createPortal } from 'react-dom';
import Modal from '../../Modal/Modal';
import { useAuthenticationMutation } from '../../../../api/authApiSlice';
import { useNavigate } from 'react-router-dom';
import Form from '../../../common/Form/Form';

const inputFields = [
  {
    id: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Password',
  },
];

const initialCredentials = {
  email: '',
  password: '',
};

const SingInForm = ({ hideForm }) => {
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState(initialCredentials);
  const [warnings, setWarnings] = useState(initialCredentials);
  const [auth] = useAuthenticationMutation();
  const navigate = useNavigate();

  const handleFormFieldChange = useCallback((e) => {
    const { id, value } = e.target;
    setCredentials(p => ({...p, [id]: value}));
  }, []);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    setWarnings(initialCredentials);
    setMessage('In progress...');

    auth(credentials).unwrap()
      .then(res => {
        if (res.status) {
          navigate('/account');
        } else {
          setWarnings(res.warnings);
          setMessage('');
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('Something went wrong');
        setTimeout(() => setMessage(''), 1000);
      })
    ;
  }, [credentials])

  const formInputFields = useMemo(
    () => inputFields.map((f) => (
      <Input {...f} key={f.id}
        value={credentials[f.id]}
        onChange={handleFormFieldChange}
        warning={warnings[f.id]}
      />
    ))
  , [credentials, warnings]);

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        {formInputFields}
        <Button classesArr={[css.singUpBtn]} onClick={null} type={'submit'}>Sign In</Button>
      </Form>
      <Button classesArr={[css.backBtn]} kind={'negative'} onClick={hideForm}>Back</Button>
      {message && createPortal(
        <Modal>{message}</Modal>,
        document.body
      )}
    </>
  );
}

export default SingInForm;
