import React, { useCallback, useMemo, useState } from 'react';
import css from './SingUpForm.module.css';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import Select from '../../../common/Select/Select';
import InputFile from '../../../common/InputFile/InputFile';
import { createPortal } from 'react-dom';
import Modal from '../../Modal/Modal';
import axios from 'axios';
import Form from '../../../common/Form/Form';


const getMaxDate = () => {
  const today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth() + 1,
        mPref = month < 10 ? '0' : '',
        day = today.getDate(),
        dPref = day < 10 ? '0' : ''
  ;

  return year + '-' + mPref + month + '-' + dPref + day;
}

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
    max: getMaxDate(),
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

const SingUpForm = ({ hideForm }) => {
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

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    setWarnings(initialWarnings);
    setMessage('In progress...');

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
      console.error(error);
      setMessage('Something went wrong');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

    if (res.data.status) {
      setMessage(res.data.message);
      setTimeout(hideForm, 1000);
    } else {
      setWarnings(res.data.warnings);
      setMessage('');
    }
  }, [credentials]);

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
        <Select warning={warnings.sex} id={'sex'} options={selectOptions} onChange={handleFormFieldChange}/>
        <InputFile warning={warnings.photo} id={'photo'} name={'photo'} onChange={handleFormFieldChange}/>
        <Button classesArr={[css.singUpBtn]} onClick={null} type={'submit'}>Sign Up</Button>
      </Form>
      <Button classesArr={[css.backBtn]} kind={'negative'} onClick={hideForm}>Back</Button>
      {message && createPortal(
        <Modal>{message}</Modal>,
        document.body
      )}
    </>
  );
}

export default SingUpForm;
