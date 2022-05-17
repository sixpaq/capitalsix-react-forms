import React from 'react';
import { withFormData } from '../../contexts/FormContext';
import { Field } from './Field';

const re_phonenumber_characters = /[^\d+]/g;
const re_phonenumber = /^(\+31|0031|0)\d{9}$/;

export const PhonenumberField = withFormData(({ ...rest }) => {
  const validation = (id, value) => {
    value = String(value).replace(re_phonenumber_characters, '');
    return re_phonenumber.test(String(value));
  }

  return (
    <Field {...rest} validation={validation} />
  )
});
