import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import { useEffect, useState } from 'react';

function PostForm(props) {
    const [state, setState] = useState({
        text: ''
    });
    const [error, setError] = useState({
        errors: {}
    });
    function onChange(e) {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        if (props.errors) {
            console.log(props.errors);
            setError((state) => ({
                ...state,
                errors: props.errors
            }));
        }
    }, [props]);
    function onSubmit(e) {
        e.preventDefault();
        const { user } = props.auth;
        const newPost = {
            text: state.text,
            name: user.name,
            avatar: user.avatar
        };
        props.addPost(newPost);
        setState({ ...state, text: '' });
    }
    let { errors } = error;
    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Say Somthing...
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup
                                placeholder="Create a post"
                                name="text"
                                value={state.text}
                                onChange={onChange}
                                error={errors.text}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
