import { get } from 'lodash';
import React from 'react';
import { withFormData } from '../../contexts/FormContext';

import './Field.scss';
import { Label } from './Label';

const initialValue = (data, id) => {
  let value = get(data, id);
  if (value === null || value === undefined || value === '') value = undefined;
  return value;
}

class InternalField extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.validation = this.validation.bind(this);

    const value = initialValue(props.data, props.id);
    this.state = {
      valid: undefined,
      value,
    };
  }

  componentDidMount() {
    const { id, onChange } = this.props;
    const { valid, value } = this.state;
    const newValid = this.validation(id, value);
    if (newValid !== valid) {
      this.setState({ valid: newValid });
      onChange && onChange(id, value, newValid);
    }
  }

  componentDidUpdate() {
    const { id, onChange } = this.props;
    const { valid, value } = this.state;
    const newValid = this.validation(id, value);
    if (newValid !== valid) {
      this.setState({ valid: newValid });
      onChange && onChange(id, value, newValid);
    }
  }

  static getDerivedStateFromProps(props) {
    const value = initialValue(props.data, props.id);
    return {
      value,
    }
  }

  validation(id, value) {
    const { required, validation: parentValidation } = this.props;
    let valid;

    if (parentValidation)
      valid = parentValidation(id, value);
    else
      valid = true;

    return valid && (value !== undefined || !required)
  }

  onChange(id, value) {
    const { onChange: parentOnChange } = this.props;

    if (value === null || value === undefined || value === '') value = undefined;
    if (parentOnChange) parentOnChange(id, value, this.validation(id, value));
  }

  render() {
    const { valid, value } = this.state;
    const { id, disabled, label, validation, required } = this.props;

    return (
      <div className={`field${valid ? '' : ' invalid'}`}>
        <Label id={id} label={label} valid={valid} validation={validation} required={required} />
        <input
          id={id}
          name={id}
          type="text"
          value={value || ""}
          onChange={event => this.onChange(id, event.target.value)}
          disabled={disabled} />
      </div>
    );
  }
}

export const Field = withFormData(InternalField);
