import React from 'react';
import { withFormData } from '../../contexts/FormContext';
import { Field } from './Field';

const re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EmailField = withFormData(({ ...rest }) => {
  const validation = (id, value) => re_email.test(String(value).toLowerCase());

  return (
    <Field {...rest} validation={validation} />
  )
});
