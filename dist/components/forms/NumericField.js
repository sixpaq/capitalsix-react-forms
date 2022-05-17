"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumericField = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

var _react = _interopRequireDefault(require("react"));

var _Field = require("./Field");

var _FormContext = require("../../contexts/FormContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const re_numeric = /^\d+$/;
const NumericField = (0, _FormContext.withFormData)(_ref => {
  let rest = Object.assign({}, _ref);

  const validation = (id, value) => re_numeric.test(String(value));

  return /*#__PURE__*/_react.default.createElement(_Field.Field, _extends({}, rest, {
    validation: validation
  }));
});
exports.NumericField = NumericField;