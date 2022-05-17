"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IbanField = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _iban = _interopRequireDefault(require("iban"));

var _FormContext = require("../../contexts/FormContext");

var _Field = require("./Field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const IbanField = (0, _FormContext.withFormData)(_ref => {
  let rest = Object.assign({}, _ref);

  const validation = (id, value) => _iban.default.isValid(value);

  return /*#__PURE__*/_react.default.createElement(_Field.Field, _extends({}, rest, {
    validation: validation
  }));
});
exports.IbanField = IbanField;