import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';

function Posts(props) {
    useEffect(() => {
        props.getPosts();
    }, []);
    const { posts, loading } = props.posts;
    let postContent;
    if (posts === null || loading) {
        postContent = <Spinner />;
    } else {
        postContent = <PostFeed posts={posts} />;
    }
    return (
        <div className="feed">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PostForm />
                        {postContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

Posts.propTypes = {
    posts: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);
