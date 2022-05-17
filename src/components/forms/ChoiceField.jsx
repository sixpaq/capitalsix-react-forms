import { get } from 'lodash';
import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { withFormData } from '../../contexts/FormContext';
import { Label } from './Label';

import './ChoiceField.scss';

class InternalChoiceField extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    const { id, data } = props;
    let value = get(data, id);

    this.state = {
      selected: value,
      valid: undefined,
    };
  }

  onClick(option) {
    const { selected } = this.state;

    if (selected === undefined || (selected !== option)) {
      this.setState({ selected: option, valid: undefined });
    } else if (selected === option) {
      this.setState({ selected: undefined, valid: undefined });
    }
  }

  componentDidUpdate() {
    const { selected, valid } = this.state;
    const { id, required, onChange, onValidChange } = this.props;

    const newValid = (selected !== undefined) || !required;
    if (newValid !== valid) {
      this.setState({ valid: newValid });
      if (onValidChange) onValidChange(id, newValid);
      if (onChange) onChange(id, selected, newValid);
    }
  }

  render() {
    const { selected, valid } = this.state;
    const { id, label, required, options, disabled } = this.props;

    return (
      <div className={`field choice-field${valid ? '' : ' invalid'}`}>
        <Label {...this.props} />
        <ButtonGroup disabled={disabled}>
          {options.map((option, index) => 
            <Button
              key={option}
              disabled={disabled}
              color={selected === index ? 'primary' : null}
              onClick={() => this.onClick(index)}>
              {option}
            </Button>
          )}
        </ButtonGroup>
      </div>
    );
  }
}

export const ChoiceField = withFormData(InternalChoiceField);
