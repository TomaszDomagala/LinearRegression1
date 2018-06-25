import React from 'react';
import "./about.css";
import ReactTooltip from 'react-tooltip';

const About = () => {
    return (
        <div className="container">
            <ReactTooltip effect="solid"/>
            <h3>About <span role="img" aria-label="clapping hands sing">👏</span></h3>
            <p>This is personal storage for programs that have something in common with machine learning.</p>
            <p>Everything here is heavily inspired by
                <a rel="noopener noreferrer"
                   href="https://www.youtube.com/user/shiffman/playlists?sort=dd&view=50&shelf_id=16" target="_blank"
                   className="link" data-tip="Check Shiffman out!"> The Coding Train</a> youtube channel.
            </p>
            <p>I'm using this repository to practise node, react, design and machine learning skills.</p>

        </div>
    );
};

export default About;