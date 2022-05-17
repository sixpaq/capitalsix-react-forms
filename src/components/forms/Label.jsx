import React from 'react';
import { FormattedMessage } from 'react-intl';

const Indicator = ({ id, required, validation, valid }) => {

  if (validation) {
    if (valid === false)
      return <i className="fa fa-s fa-exclamation"></i>;
    else
      return <i className="fa fa-s fa-check"></i>;
  }

  if (required) {
    return <i className="fa fa-s fa-asterisk"></i>;
  }

  return null;
}

export const Label = ({ id, label, ...rest }) =>
  <label htmlFor={id}>
    <FormattedMessage id={label || id} defaultMessage={label || id} />
    <div className="indicator"><Indicator id={id} {...rest} /></div>
  </label>;
