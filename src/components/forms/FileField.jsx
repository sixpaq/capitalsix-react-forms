import React from 'react';
import Dropzone from 'react-dropzone';
import { withFormData } from '../../contexts/FormContext';

import './FileField.scss';

class InternalFileField extends React.Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      files: [],
      valid: undefined,
    }
  }

  validate(id, files) {
    return files && files.length > 0;
  }

  onDrop(acceptedFiles) {
    const { valid } = this.state;
    const { id, validate, onChange } = this.props;
    const files = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    this.setState({ files });
    const newValid = validate ? validate(id, files) : (files && files.length);
    if (valid !== newValid) this.setState({ valid: newValid });
    if (onChange) onChange(id, acceptedFiles, newValid);
  }

  componentDidMount() {
    const { id, validate, onChange } = this.props;
    const { files, valid } = this.state;
    const newValid = validate ? validate(id, files) : (files && files.length);
    if (valid !== newValid) {
      this.setState({ valid: newValid });
      if (onChange) onChange(id, files, newValid);
    }
  }

  render() {
    const { children, disabled, maxFiles } = this.props;
    const { files, valid } = this.state;

    const thumbs = files.map(file => (
      <div className="thumb" key={file.name}>
        <div className="img" style={{ backgroundImage: `url(${file.preview})` }}></div>
      </div>
    ));

    return (
      <Dropzone
        onDrop={this.onDrop}
        accept='image/jpeg, image/png, application/pdf'
        disabled={disabled}
        maxFiles={maxFiles}
        multiple={(!maxFiles || maxFiles > 1)}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps({ className: `dropzone${disabled ? ' dropzone-disabled' : ''}${valid ? '' : ' dropzone-invalid'}` })}>
            <input {...getInputProps()} />
            <div>
              {files.length ? (
                <div className="thumbs">
                  {thumbs}
                </div>)
                : children}
            </div>
          </div>
        )}
      </Dropzone>
    );
  }
}

export const FileField = withFormData(InternalFileField);
