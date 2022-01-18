import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProfileGithub(props) {
    const [client, setClient] = useState({
        clientId: 'ef738af5675c15965fb5',
        clientSecret: 'b5f44f6b9d7036ab1a53e28a5fe9459d29d82c07',
        count: 5,
        sort: 'created:asc',
        repos: []
    });

    useEffect(() => {
        const { username } = props;
        const { count, sort, clientId, clientSecret } = client;
        fetch(
            `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        )
            .then((res) => res.json())
            .then((data) => {
                setClient({ ...client, repos: data });
            })
            .catch((err) => console.log(err));
    }, []);

    const { repos } = client;

    const repoItems = repos.map((repo) => (
        <div key={repo.id} className="card card-body mb-2">
            <div className="row">
                <div className="col-md-6">
                    <h4>
                        <Link
                            to={repo.html_url}
                            className="text-info"
                            target="_blank"
                        >
                            {repo.name}
                        </Link>
                    </h4>
                    <p>{repo.description}</p>
                </div>
                <div className="col-md-6">
                    <span className="badge bg-info mr-1">
                        Stars: {repo.stargazers_count}
                    </span>
                    <span className="badge bg-secondary mr-1">
                        Watchers: {repo.watchers_count}
                    </span>
                    <span className="badge bg-success mr-1">
                        Forks: {repo.forks_count}
                    </span>
                </div>
            </div>
        </div>
    ));

    return (
        <div>
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            {repoItems}
        </div>
    );
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
};

export default ProfileGithub;
