import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

const Post = (props) => {
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            props.getPost(id);
        }
    }, []);
    const { post, loading } = props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
        postContent = <Spinner />;
    } else {
        postContent = (
            <div>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <CommentFeed postId={post._id} comments={post.comments} />
            </div>
        );
    }
    return (
        <div className="post">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/feed" className="btn btn-light mb-3">
                            Back To Feed
                        </Link>
                        {postContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.posts
});

export default connect(mapStateToProps, { getPost })(Post);
