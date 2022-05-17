import { get, set } from 'lodash';
import React from 'react';

const FormContext = React.createContext({});

export const FormConsumer = FormContext.Consumer;
export class FormProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      validations: {},
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }

  canSubmit() {
    const { onCanSubmit } = this.props;
    const { validations: statValidations } = this.state;
    const validations = Object.assign({}, statValidations);
    const addressValidations = validations.address ? Object.values(validations.address) : [];

    validations.address = (addressValidations && addressValidations.filter(v => !v).length === 0);
    const consumerValidations = Object.values(validations);

    const canSubmit = (
      (consumerValidations && consumerValidations.filter(v => !v).length === 0));

    if (canSubmit !== this.state.canSubmit) {
      this.setState({ canSubmit });
      if (onCanSubmit) onCanSubmit(canSubmit);
    }
  }

  onChange(id, value, valid) {
    const { onChange: parentOnChange, onValidChange } = this.props;
    const { data, validations } = this.state;

    const currentValue = get(data, id);
    const currentValid = get(validations, id);
    const changed = (currentValue !== value) || (currentValid !== valid);

    if (changed) {
      set(data, id, value);
      set(validations, id, valid);
      if (parentOnChange) parentOnChange(id, value, valid, data);
      if (onValidChange) onValidChange(id, valid);
      this.setState({ data, validations });
      this.canSubmit();
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const { onSubmit: parentOnSubmit } = this.props;
    const { data, canSubmit } = this.state;

    // if (!canSubmit) return;
    parentOnSubmit(data);
  }

  render() {
    const { children, disabled } = this.props;
    const { data, canSubmit } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <FormContext.Provider value={{ data, onChange: this.onChange, canSubmit, disabled }}>
          {children}
        </FormContext.Provider>
      </form>
    );
  }
}

export function withFormData(WrappedComponent) {
  return (props) => (
    <FormConsumer>
      {({ id, data, onChange, validations, disabled }) =>
        <WrappedComponent
          id={id}
          data={data}
          valid={get(validations, id)}
          onChange={onChange}
          disabled={disabled}
          {...props} />}
    </FormConsumer>
  );
}
