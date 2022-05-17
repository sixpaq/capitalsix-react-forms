import React from 'react';
import Iban from 'iban';
import { withFormData } from '../../contexts/FormContext';
import { Field } from './Field';

export const IbanField = withFormData(({ ...rest }) => {
  const validation = (id, value) => Iban.isValid(value);

  return (
    <Field {...rest} validation={validation} />
  );
});
