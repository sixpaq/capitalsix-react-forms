"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoiceField = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactstrap = require("reactstrap");

var _FormContext = require("../../contexts/FormContext");

var _Label = require("./Label");

require("./ChoiceField.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InternalChoiceField extends _react.default.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    const {
      id,
      data
    } = props;
    let value = (0, _lodash.get)(data, id);
    this.state = {
      selected: value,
      valid: undefined
    };
  }

  onClick(option) {
    const {
      selected
    } = this.state;

    if (selected === undefined || selected !== option) {
      this.setState({
        selected: option,
        valid: undefined
      });
    } else if (selected === option) {
      this.setState({
        selected: undefined,
        valid: undefined
      });
    }
  }

  componentDidUpdate() {
    const {
      selected,
      valid
    } = this.state;
    const {
      id,
      required,
      onChange,
      onValidChange
    } = this.props;
    const newValid = selected !== undefined || !required;

    if (newValid !== valid) {
      this.setState({
        valid: newValid
      });
      if (onValidChange) onValidChange(id, newValid);
      if (onChange) onChange(id, selected, newValid);
    }
  }

  render() {
    const {
      selected,
      valid
    } = this.state;
    const {
      id,
      label,
      required,
      options,
      disabled
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "field choice-field".concat(valid ? '' : ' invalid')
    }, /*#__PURE__*/_react.default.createElement(_Label.Label, this.props), /*#__PURE__*/_react.default.createElement(_reactstrap.ButtonGroup, {
      disabled: disabled
    }, options.map((option, index) => /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
      key: option,
      disabled: disabled,
      color: selected === index ? 'primary' : null,
      onClick: () => this.onClick(index)
    }, option))));
  }

}

const ChoiceField = (0, _FormContext.withFormData)(InternalChoiceField);
exports.ChoiceField = ChoiceField;