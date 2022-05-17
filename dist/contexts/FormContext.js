"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormProvider = exports.FormConsumer = void 0;
exports.withFormData = withFormData;

require("core-js/modules/es.object.assign.js");

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const FormContext = /*#__PURE__*/_react.default.createContext({});

const FormConsumer = FormContext.Consumer;
exports.FormConsumer = FormConsumer;

class FormProvider extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      validations: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }

  canSubmit() {
    const {
      onCanSubmit
    } = this.props;
    const {
      validations: statValidations
    } = this.state;
    const validations = Object.assign({}, statValidations);
    const addressValidations = validations.address ? Object.values(validations.address) : [];
    validations.address = addressValidations && addressValidations.filter(v => !v).length === 0;
    const consumerValidations = Object.values(validations);
    const canSubmit = consumerValidations && consumerValidations.filter(v => !v).length === 0;

    if (canSubmit !== this.state.canSubmit) {
      this.setState({
        canSubmit
      });
      if (onCanSubmit) onCanSubmit(canSubmit);
    }
  }

  onChange(id, value, valid) {
    const {
      onChange: parentOnChange,
      onValidChange
    } = this.props;
    const {
      data,
      validations
    } = this.state;
    const currentValue = (0, _lodash.get)(data, id);
    const currentValid = (0, _lodash.get)(validations, id);
    const changed = currentValue !== value || currentValid !== valid;

    if (changed) {
      (0, _lodash.set)(data, id, value);
      (0, _lodash.set)(validations, id, valid);
      if (parentOnChange) parentOnChange(id, value, valid, data);
      if (onValidChange) onValidChange(id, valid);
      this.setState({
        data,
        validations
      });
      this.canSubmit();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const {
      onSubmit: parentOnSubmit
    } = this.props;
    const {
      data,
      canSubmit
    } = this.state; // if (!canSubmit) return;

    parentOnSubmit(data);
  }

  render() {
    const {
      children,
      disabled
    } = this.props;
    const {
      data,
      canSubmit
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("form", {
      onSubmit: this.onSubmit
    }, /*#__PURE__*/_react.default.createElement(FormContext.Provider, {
      value: {
        data,
        onChange: this.onChange,
        canSubmit,
        disabled
      }
    }, children));
  }

}

exports.FormProvider = FormProvider;

function withFormData(WrappedComponent) {
  return props => /*#__PURE__*/_react.default.createElement(FormConsumer, null, _ref => {
    let {
      id,
      data,
      onChange,
      validations,
      disabled
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(WrappedComponent, _extends({
      id: id,
      data: data,
      valid: (0, _lodash.get)(validations, id),
      onChange: onChange,
      disabled: disabled
    }, props));
  });
}