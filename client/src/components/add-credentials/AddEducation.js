import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

const AddEducation = (props) => {
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
        disabled: false
    });

    const [error, setError] = useState({
        errors: {}
    });

    useEffect(() => {
        if (props.errors) {
            setError((state) => ({
                ...state,
                errors: props.errors
            }));
        }
    }, [props]);

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
        disabled
    } = inputs;

    const { errors } = error;

    const onSubmit = (e) => {
        e.preventDefault();
        const eduData = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };
        props.addEducation(eduData, navigate);
    };

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onCheck = (e) => {
        setInputs({
            ...inputs,
            disabled: !disabled,
            current: !current
        });
    };

    return (
        <div className="add-education">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Education</h1>
                        <p className="lead text-center">
                            Add education that you have had in the past or
                            current
                        </p>
                        <small className="d-block pb-3">
                            * = required fields
                        </small>
                        <form onSubmit={onSubmit}>
                            <TextFieldGroup
                                placeholder="* School"
                                name="school"
                                value={school}
                                onChange={onChange}
                                error={errors.school}
                            />
                            <TextFieldGroup
                                placeholder="* Degree or Cerification"
                                name="degree"
                                value={degree}
                                onChange={onChange}
                                error={errors.degree}
                            />
                            <TextFieldGroup
                                placeholder="* Field of Study"
                                name="fieldofstudy"
                                value={fieldofstudy}
                                onChange={onChange}
                                error={errors.fieldofstudy}
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
                                placeholder="Program Description"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(AddEducation);
