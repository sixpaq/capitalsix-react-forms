import React from 'react';
import { Field } from './Field';
import { withFormData } from '../../contexts/FormContext';

const re_numeric = /^\d+$/;

export const NumericField = withFormData(({ ...rest }) => {
  const validation = (id, value) => re_numeric.test(String(value));

  return (
    <Field {...rest} validation={validation} />
  );
});
