import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    info,
    onChange
}) => {
    return (
        <div className="mb-3 input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}></i>
                </span>
            </div>
            <input
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
    type: 'text'
};

export default InputGroup;
