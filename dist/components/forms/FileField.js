"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileField = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

var _react = _interopRequireDefault(require("react"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _FormContext = require("../../contexts/FormContext");

require("./FileField.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InternalFileField extends _react.default.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      files: [],
      valid: undefined
    };
  }

  validate(id, files) {
    return files && files.length > 0;
  }

  onDrop(acceptedFiles) {
    const {
      valid
    } = this.state;
    const {
      id,
      validate,
      onChange
    } = this.props;
    const files = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    this.setState({
      files
    });
    const newValid = validate ? validate(id, files) : files && files.length;
    if (valid !== newValid) this.setState({
      valid: newValid
    });
    if (onChange) onChange(id, acceptedFiles, newValid);
  }

  componentDidMount() {
    const {
      id,
      validate,
      onChange
    } = this.props;
    const {
      files,
      valid
    } = this.state;
    const newValid = validate ? validate(id, files) : files && files.length;

    if (valid !== newValid) {
      this.setState({
        valid: newValid
      });
      if (onChange) onChange(id, files, newValid);
    }
  }

  render() {
    const {
      children,
      disabled,
      maxFiles
    } = this.props;
    const {
      files,
      valid
    } = this.state;
    const thumbs = files.map(file => /*#__PURE__*/_react.default.createElement("div", {
      className: "thumb",
      key: file.name
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "img",
      style: {
        backgroundImage: "url(".concat(file.preview, ")")
      }
    })));
    return /*#__PURE__*/_react.default.createElement(_reactDropzone.default, {
      onDrop: this.onDrop,
      accept: "image/jpeg, image/png, application/pdf",
      disabled: disabled,
      maxFiles: maxFiles,
      multiple: !maxFiles || maxFiles > 1
    }, _ref => {
      let {
        getRootProps,
        getInputProps
      } = _ref;
      return /*#__PURE__*/_react.default.createElement("div", getRootProps({
        className: "dropzone".concat(disabled ? ' dropzone-disabled' : '').concat(valid ? '' : ' dropzone-invalid')
      }), /*#__PURE__*/_react.default.createElement("input", getInputProps()), /*#__PURE__*/_react.default.createElement("div", null, files.length ? /*#__PURE__*/_react.default.createElement("div", {
        className: "thumbs"
      }, thumbs) : children));
    });
  }

}

const FileField = (0, _FormContext.withFormData)(InternalFileField);
exports.FileField = FileField;