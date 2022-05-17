"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FormContext = require("./FormContext");

Object.keys(_FormContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FormContext[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FormContext[key];
    }
  });
});