import React, { useCallback, useMemo, useState } from 'react';
import css from './EditUserForm.module.css';
import InputFile from '../../../common/InputFile/InputFile';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import Form from '../../../common/Form/Form';
import { createPortal } from 'react-dom';
import Modal from '../../Modal/Modal';
import { useIdentificationQuery } from '../../../../api/authApiSlice';
import axios from 'axios';

const inputFields = [
  {
    id: 'name',
    type: 'text',
    placeholder: 'Name',
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
];

const mainFields = {
  name: '',
  photo: '',
  password: '',
};

const initialCredentials = {
  ...mainFields,
  repeatedPassword: '',
};

const EditUserForm = ({ hideForm }) => {
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState(initialCredentials);
  const [warnings, setWarnings] = useState(initialCredentials);
  const { refetch: reIdentify } = useIdentificationQuery();

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

    setWarnings(initialCredentials);
    setMessage('In progress...');

    let res;
    try {
      res = await axios.post(
        '/api/updateUser',
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
      setTimeout(() => {
        hideForm();
        reIdentify();
      }, 1000);
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

  const isEditBtnDisabled = useMemo(
    () => Object.keys(mainFields).reduce(
      (res, key) => res ? !credentials[key] : res
      , true)
  , [credentials]);

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        {formInputFields}
        <InputFile warning={warnings.photo} id={'photo'} name={'photo'} onChange={handleFormFieldChange}/>
        <Button classesArr={[css.editBtn]} kind={'positive'} onClick={null} type={'submit'} disabled={isEditBtnDisabled}>Edit</Button>
      </Form>
      <Button classesArr={[css.cancelBtn]} kind={'negative'} onClick={hideForm}>Cancel</Button>
      {message && createPortal(
        <Modal>{message}</Modal>,
        document.body
      )}
    </>
  )
}

export default EditUserForm