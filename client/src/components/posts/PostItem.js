import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

function PostItem(props) {
    const { post, auth, showActions } = props;
    function onDeleteClick(id) {
        props.deletePost(id);
    }
    function onLikeClick(id) {
        props.addLike(id);
    }
    function onUnlikeClick(id) {
        props.removeLike(id);
    }

    function findUsersLike(likes) {
        const { auth } = props;
        if (likes.filter((like) => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <a href="profile.html">
                        <img
                            className="rounded-circle d-none d-md-block"
                            src={post.avatar}
                            alt=""
                        />
                    </a>
                    <br />
                    <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                    {showActions ? (
                        <span>
                            <button
                                onClick={() => onLikeClick(post._id)}
                                type="button"
                                className="btn btn-light mr-1"
                            >
                                <i
                                    className={classnames('fas fa-thumbs-up', {
                                        'text-primary': findUsersLike(
                                            post.likes
                                        )
                                    })}
                                ></i>
                                <span className="badge bg-light">
                                    {post.likes.length}
                                </span>
                            </button>
                            <button
                                onClick={() => onUnlikeClick(post._id)}
                                type="button"
                                className="btn btn-light mr-1"
                            >
                                <i className="text-secondary fas fa-thumbs-down"></i>
                            </button>
                            <Link
                                to={`/post/${post._id}`}
                                className="btn btn-info mr-1"
                            >
                                Comments
                            </Link>
                            {post.user === auth.user.id ? (
                                <button
                                    onClick={() => onDeleteClick(post._id)}
                                    type="button"
                                    className="btn btn-danger mr-1"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            ) : null}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
};

PostItem.defaultProps = {
    showActions: true
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
    PostItem
);
