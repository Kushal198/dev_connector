import React, { useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByHandle } from '../../actions/profileActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Profile(props) {
    const { handle } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        if (handle) {
            props.getProfileByHandle(handle);
        }
    }, []);

    useEffect(() => {
        if (props.profile.profile === null && props.profile.loading) {
            navigate('/not-found');
        }
    }, [props]);
    const { profile, loading } = props.profile;
    let profileContent;
    if (profile === null || loading) {
        profileContent = <Spinner />;
    } else {
        profileContent = (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link
                            to="/profiles"
                            className="btn btn-light mb-3 float-left"
                        >
                            Back To Profiles
                        </Link>
                    </div>
                    <div className="col-md-6"></div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds
                        experience={profile.experience}
                        education={profile.education}
                    />
                    {profile.githubusername ? (
                        <ProfileGithub username={profile.githubusername} />
                    ) : null}
                </div>
            </div>
        );
    }
    return (
        <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">{profileContent}</div>
                </div>
            </div>
        </div>
    );
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
