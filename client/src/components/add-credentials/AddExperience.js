import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';

const AddExperience = (props) => {
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        disabled: false
    });
    const [error, setError] = useState({
        errors: {}
    });

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
        disabled
    } = inputs;

    const { errors } = error;
    useEffect(() => {
        if (props.errors) {
            setError((state) => ({
                ...state,
                errors: props.errors
            }));
        }
    }, [props]);
    function onChange(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    function onSubmit(e) {
        e.preventDefault();
        const expData = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };
        props.addExperience(expData, navigate);
    }
    function onCheck(e) {
        setInputs({
            ...inputs,
            disabled: !disabled,
            current: !current
        });
    }

    return (
        <div className="add-experience">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">
                            Add Experience
                        </h1>
                        <p className="lead text-center">
                            Add any job or position that you have had in the
                            past or current
                        </p>
                        <small className="d-block pb-3">
                            * = required fields
                        </small>
                        <form onSubmit={onSubmit}>
                            <TextFieldGroup
                                placeholder="* Company"
                                name="company"
                                value={company}
                                onChange={onChange}
                                error={errors.company}
                            />
                            <TextFieldGroup
                                placeholder="* Job Title"
                                name="title"
                                value={title}
                                onChange={onChange}
                                error={errors.title}
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={location}
                                onChange={onChange}
                                error={errors.location}
                            />
                            <h6>From Date</h6>
                            <TextFieldGroup
                                name="from"
                                type="date"
                                value={from}
                                onChange={onChange}
                                error={errors.from}
                            />
                            <h6>To Date</h6>
                            <TextFieldGroup
                                name="to"
                                type="date"
                                value={to}
                                onChange={onChange}
                                error={errors.to}
                                disabled={disabled ? 'disabled' : ''}
                            />
                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={current}
                                    checked={current}
                                    onChange={onCheck}
                                    id="current"
                                />
                                <label
                                    htmlFor="current"
                                    className="form-check-label"
                                >
                                    Current Job
                                </label>
                            </div>
                            <TextAreaFieldGroup
                                placeholder="Job Description"
                                name="description"
                                value={description}
                                onChange={onChange}
                                error={errors.description}
                            />
                            <input
                                type="submit"
                                className="btn btn-info mt-4"
                                value="Submit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(AddExperience);
