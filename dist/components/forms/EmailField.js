"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailField = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

var _react = _interopRequireDefault(require("react"));

var _FormContext = require("../../contexts/FormContext");

var _Field = require("./Field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EmailField = (0, _FormContext.withFormData)(_ref => {
  let rest = Object.assign({}, _ref);

  const validation = (id, value) => re_email.test(String(value).toLowerCase());

  return /*#__PURE__*/_react.default.createElement(_Field.Field, _extends({}, rest, {
    validation: validation
  }));
});
exports.EmailField = EmailField;