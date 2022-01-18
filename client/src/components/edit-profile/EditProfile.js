import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import { useNavigate } from 'react-router';
import isEmpty from '../../validation/is-empty';
import { Link } from 'react-router-dom';

const CreateProfile = (props) => {
    const [inputs, setInputs] = useState({
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [error, setError] = useState({
        errors: {}
    });

    useEffect(() => {
        props.getCurrentProfile();
    }, []);

    let navigate = useNavigate();
    const {
        displaySocialInputs,
        handle,
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = inputs;

    const { errors } = error;

    useEffect(() => {
        if (props.errors) {
            console.log(props);
            setError((prevState) => ({
                ...prevState,
                errors: props.errors
            }));
        }
        if (props.profile.profile) {
            const profile = props.profile.profile;

            //Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',');

            //if profile field doesn't exists make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location)
                ? profile.location
                : '';
            profile.githubusername = !isEmpty(profile.githubusername)
                ? profile.githubusername
                : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.linkedin = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : '';
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';
            //Set component fields state
            setInputs((prevState) => ({
                ...prevState,
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            }));
        }
    }, [props]);

    let socialInputs;
    if (displaySocialInputs) {
        socialInputs = (
            <div>
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={twitter}
                    onChange={onChange}
                    error={errors.twitter}
                />
                <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={facebook}
                    onChange={onChange}
                    error={errors.facebook}
                />
                <InputGroup
                    placeholder="Youtube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={youtube}
                    onChange={onChange}
                    error={errors.youtube}
                />
                <InputGroup
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={instagram}
                    onChange={onChange}
                    error={errors.instagram}
                />
            </div>
        );
    }

    function onChange(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            displaySocialInputs,
            handle,
            company,
            website,
            location,
            status,
            skills,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youtube,
            instagram
        };
        props.createProfile(profileData, navigate);
    };

    //Select options for status
    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
    ];

    return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Edit Profile</h1>

                        <small className="d-block pb-3">
                            * = required fields
                        </small>
                        <form onSubmit={onSubmit}>
                            <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="handle"
                                value={handle}
                                onChange={onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your fullname, company name, nickname"
                            />
                            <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={status}
                                onChange={onChange}
                                error={errors.status}
                                options={options}
                                info="Give us an idea of where you are at in your career"
                            />
                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={company}
                                onChange={onChange}
                                error={errors.company}
                                info="Could be your own company or one you work for"
                            />

                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={website}
                                onChange={onChange}
                                error={errors.website}
                                info="Could be your own website or a company one"
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={location}
                                onChange={onChange}
                                error={errors.location}
                                info="City or city & state suggested (eg. Boston, MA)"
                            />
                            <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                value={skills}
                                onChange={onChange}
                                error={errors.skills}
                                info="Please use comma seperated values (eg. HTML, CSS, JavaScript)"
                            />
                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={githubusername}
                                onChange={onChange}
                                error={errors.githubusername}
                                info="If you want your latest repos and a Github link, include your username"
                            />
                            <TextAreaFieldGroup
                                placeholder="Bio"
                                name="bio"
                                value={bio}
                                onChange={onChange}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                            />
                            <div className="mb-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setInputs((prevState) => ({
                                            ...prevState,
                                            displaySocialInputs:
                                                !displaySocialInputs
                                        }));
                                    }}
                                    className="btn btn-light"
                                >
                                    Add Social Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-info btn-block mt-4"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    CreateProfile
);
