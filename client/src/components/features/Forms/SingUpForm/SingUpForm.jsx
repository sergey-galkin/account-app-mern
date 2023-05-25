import React, { useCallback, useEffect, useMemo, useState } from 'react';
import css from './SingUpForm.module.css';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
// import { useDispatch, useSelector } from 'react-redux';
import { useAuthenticationMutation } from '../../../../api/authApiSlice';
// import { resetCredentials, resetChecks, setCredentials, setChecks, setMessage } from './LoginWindowSlice';
// import ContentHolder from '../../../common/ContentHolder/ContentHolder';
import Select from '../../../common/Select/Select';
import InputFile from '../../../common/InputFile/InputFile';
import { createPortal } from 'react-dom';
import Modal from '../../Modal/Modal';
import axios from 'axios';

const inputFields = [
  {
    id: 'name',
    type: 'text',
    placeholder: 'Name',
  },
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
  {
    id: 'repeatedPassword',
    type: 'password',
    placeholder: 'Repeat password',
  },
  {
    id: 'birthDate',
    type: 'date',
  },
];

const selectOptions = [
  {
    value: '',
    text: '-- sex --',
  },
  {
    value: 'm',
    text: 'Male',
  },
  {
    value: 'f',
    text: 'Female',
  },
];

const initialWarnings = {
  name: '',
  email: '',
  password: '',
  repeatedPassword: '',
  birthDate: '',
  sex: '',
  photo: '',
};

const getInitialState = (initialValue) => {
  return {
    login: initialValue,
    password: initialValue,
  }
};

const SingUpForm = ({ toStartPage }) => {
  const [auth] = useAuthenticationMutation();
  // const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState(initialWarnings);
  const [warnings, setWarnings] = useState(initialWarnings);

  const handleFormFieldChange = useCallback((e) => {
    const { id, value } = e.target;
    if (id === 'photo') {
      setCredentials(p => ({...p, [id]: e.target.files[0]}));
      return;
    }
    setCredentials(p => ({...p, [id]: value}));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setWarnings(initialWarnings);

    let res;
    try {
      res = await axios.post(
        '/api/registration',
        credentials,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    } catch (error) {
      console.log(error);
      setMessage('Something went wrong');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

    console.log(res);

    if (res.data.status) {
      setMessage(res.data.message);
      setTimeout(toStartPage, 1000);
    } else {
      setWarnings(res.data.warnings);
      setMessage('');
    }
  }

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
      <form className={css.form} onSubmit={handleFormSubmit}>
        {formInputFields}
        <Select warning={warnings.sex} id={'sex'} options={selectOptions} onChange={handleFormFieldChange}/>
        <InputFile warning={warnings.photo} id={'photo'} name={'photo'} onChange={handleFormFieldChange}/>
        <Button classesArr={[css.singUpBtn]} onClick={null} type={'submit'}>Sign Up</Button>
      </form>
      <Button classesArr={[css.toStartPageBtn]} onClick={toStartPage}>To Start Page</Button>
      {message && createPortal(
        <Modal>{message}</Modal>,
        document.body
      )}
    </>
  );
}

export default SingUpForm;
