"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _FormContext = require("../../contexts/FormContext");

require("./Field.scss");

var _Label = require("./Label");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialValue = (data, id) => {
  let value = (0, _lodash.get)(data, id);
  if (value === null || value === undefined || value === '') value = undefined;
  return value;
};

class InternalField extends _react.default.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.validation = this.validation.bind(this);
    const value = initialValue(props.data, props.id);
    this.state = {
      valid: undefined,
      value
    };
  }

  componentDidMount() {
    const {
      id,
      onChange
    } = this.props;
    const {
      valid,
      value
    } = this.state;
    const newValid = this.validation(id, value);

    if (newValid !== valid) {
      this.setState({
        valid: newValid
      });
      onChange && onChange(id, value, newValid);
    }
  }

  componentDidUpdate() {
    const {
      id,
      onChange
    } = this.props;
    const {
      valid,
      value
    } = this.state;
    const newValid = this.validation(id, value);

    if (newValid !== valid) {
      this.setState({
        valid: newValid
      });
      onChange && onChange(id, value, newValid);
    }
  }

  static getDerivedStateFromProps(props) {
    const value = initialValue(props.data, props.id);
    return {
      value
    };
  }

  validation(id, value) {
    const {
      required,
      validation: parentValidation
    } = this.props;
    let valid;
    if (parentValidation) valid = parentValidation(id, value);else valid = true;
    return valid && (value !== undefined || !required);
  }

  onChange(id, value) {
    const {
      onChange: parentOnChange
    } = this.props;
    if (value === null || value === undefined || value === '') value = undefined;
    if (parentOnChange) parentOnChange(id, value, this.validation(id, value));
  }

  render() {
    const {
      valid,
      value
    } = this.state;
    const {
      id,
      disabled,
      label,
      validation,
      required
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "field".concat(valid ? '' : ' invalid')
    }, /*#__PURE__*/_react.default.createElement(_Label.Label, {
      id: id,
      label: label,
      valid: valid,
      validation: validation,
      required: required
    }), /*#__PURE__*/_react.default.createElement("input", {
      id: id,
      name: id,
      type: "text",
      value: value || "",
      onChange: event => this.onChange(id, event.target.value),
      disabled: disabled
    }));
  }

}

const Field = (0, _FormContext.withFormData)(InternalField);
exports.Field = Field;