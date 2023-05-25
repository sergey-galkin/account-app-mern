import React, { useMemo, useState } from 'react';
import css from './Index.module.css';
import Button from '../../common/Button/Button';
import H1 from '../../common/H1/H1';
import { useIdentificationQuery, useSignOutMutation } from '../../../api/authApiSlice';
import SingUpForm from '../../features/Forms/SingUpForm/SingUpForm';
import PageTemplate from '../../common/PageTemplate/PageTemplate';

const headers = {
  ['sign up']: 'Sign Up',
  ['sign in']: 'Sign In',
  ['sign out']: 'Sign Out',
}

const Index = () => {
  const { data: user } = useIdentificationQuery;
  const [signOut] = useSignOutMutation();

  const [action, setAction] = useState('');

  const buttonsHandlers = useMemo(() => {
    return {
      signUp: () => setAction('sign up'),
      signIn: () => setAction('sign in'),
      toStartPage: () => setAction(''),
    }
  }, [])

  const header = action ? <H1>{headers[action]}</H1> : null;
  const templateClasses = [css.template];
  if (action === '') templateClasses.push(css.jcCenter)

  return (
    <PageTemplate classesArr={templateClasses}>
      { header }
      { user 
        ? <Button classesArr={[css.btn]} onClick={signOut}>Sign Out</Button>
        : action === 'sign up'
        ? <SingUpForm toStartPage={buttonsHandlers.toStartPage}/>
        : action === 'sign in'
        ? <></>
        : 
        <>
          <Button classesArr={[css.btn]} onClick={buttonsHandlers.signUp}>Sign Up</Button>
          <Button classesArr={[css.btn]} onClick={buttonsHandlers.signIn}>Sign In</Button>
        </>
      }
    </PageTemplate>
  )
}

export default Index