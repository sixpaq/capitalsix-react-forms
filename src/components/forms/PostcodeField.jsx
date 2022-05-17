import React from 'react';
import { withFormData } from '../../contexts/FormContext';
import { Field } from './Field';

const re_postcode = /^\d{4}\s?[A-Z]{2}$/;

export const PostcodeField = withFormData(({ ...rest }) => {
  const validation = (id, value) => re_postcode.test(String(value).toUpperCase());

  return (
    <Field {...rest} validation={validation} />
  )
});
