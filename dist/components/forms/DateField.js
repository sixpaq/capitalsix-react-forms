"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateField = void 0;

require("core-js/modules/es.parse-int.js");

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _FormContext = require("../../contexts/FormContext");

var _Label = require("./Label");

require("./DateField.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InternalDateField extends _react.default.Component {
  constructor(props) {
    super(props);
    this.validateDate = this.validateDate.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    const {
      id,
      data
    } = props;
    let value = (0, _lodash.get)(data, id);
    if (value === null || value === undefined) value = undefined;
    const day = value ? (0, _moment.default)(value).date() : undefined;
    const month = value ? (0, _moment.default)(value).month() + 1 : undefined;
    const year = value ? (0, _moment.default)(value).year() : undefined;
    this.state = {
      value,
      valid: undefined,
      day,
      month,
      year
    };
  }

  validateDate() {
    const {
      day,
      month,
      year,
      value
    } = this.state;
    const {
      required
    } = this.props;

    if (day && month && year && year > 1900) {
      const dateConstruct = _moment.default.utc();

      dateConstruct.set('year', year);
      dateConstruct.set('month', month - 1);
      dateConstruct.set('date', day);
      dateConstruct.startOf('day');

      if (dateConstruct.isValid() && dateConstruct.year() === year && dateConstruct.month() === month - 1 && dateConstruct.date() === day) {
        const dateValue = dateConstruct.toDate();
        return {
          changed: value === undefined || !(0, _moment.default)(value).isSame(dateValue, 'day'),
          valid: true,
          value: dateValue
        };
      }
    }

    return {
      changed: value !== undefined,
      valid: !required,
      value: undefined
    };
  }

  checkDate() {
    const {
      valid
    } = this.state;
    const {
      id,
      onChange
    } = this.props;
    const validationResult = this.validateDate();

    if (validationResult.changed) {
      this.setState({
        value: validationResult.value
      });
      if (onChange) onChange(id, validationResult.value, validationResult.valid);
    }

    if (validationResult.valid !== valid) {
      this.setState({
        valid: validationResult.valid
      });
      if (onChange) onChange(id, validationResult.value, validationResult.valid);
    }
  }

  onChangeDay(value) {
    var numericValue = parseInt(value);

    if (numericValue) {
      this.setState({
        day: numericValue
      }, () => this.checkDate());
    } else {
      this.setState({
        day: undefined
      }, () => this.checkDate());
    }
  }

  onChangeMonth(value) {
    var numericValue = parseInt(value);

    if (numericValue) {
      this.setState({
        month: numericValue
      }, () => this.checkDate());
    } else {
      this.setState({
        month: undefined
      }, () => this.checkDate());
    }
  }

  onChangeYear(value) {
    var numericValue = parseInt(value);

    if (numericValue) {
      this.setState({
        year: numericValue
      }, () => this.checkDate());
    } else {
      this.setState({
        year: undefined
      }, () => this.checkDate());
    }
  }

  componentDidUpdate() {
    this.checkDate();
  }

  render() {
    const {
      day,
      month,
      year,
      valid
    } = this.state;
    const {
      id,
      label,
      required,
      disabled
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "field date-field".concat(valid ? '' : ' invalid')
    }, /*#__PURE__*/_react.default.createElement(_Label.Label, this.props), /*#__PURE__*/_react.default.createElement("div", {
      className: "date"
    }, /*#__PURE__*/_react.default.createElement("input", {
      name: "day",
      value: day || '',
      onChange: e => this.onChangeDay(e.target.value),
      disabled: disabled
    }), /*#__PURE__*/_react.default.createElement("input", {
      name: "month",
      value: month || '',
      onChange: e => this.onChangeMonth(e.target.value),
      disabled: disabled
    }), /*#__PURE__*/_react.default.createElement("input", {
      name: "year",
      value: year || '',
      onChange: e => this.onChangeYear(e.target.value),
      disabled: disabled
    })));
  }

}

const DateField = (0, _FormContext.withFormData)(InternalDateField);
exports.DateField = DateField;