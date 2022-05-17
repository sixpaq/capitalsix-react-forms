"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

const _excluded = ["id", "label"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Indicator = _ref => {
  let {
    id,
    required,
    validation,
    valid
  } = _ref;

  if (validation) {
    if (valid === false) return /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-s fa-exclamation"
    });else return /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-s fa-check"
    });
  }

  if (required) {
    return /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-s fa-asterisk"
    });
  }

  return null;
};

const Label = _ref2 => {
  let {
    id,
    label
  } = _ref2,
      rest = _objectWithoutProperties(_ref2, _excluded);

  return /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: id
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    id: label || id,
    defaultMessage: label || id
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "indicator"
  }, /*#__PURE__*/_react.default.createElement(Indicator, _extends({
    id: id
  }, rest))));
};

exports.Label = Label;