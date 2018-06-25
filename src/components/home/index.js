import React from 'react';
import styled from "styled-components";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="container">
            <p><Link to="/about">About</Link></p>
            <p><Link to="/LinearRegressionOLS">Linear Regression with Ordinary Least Squares</Link></p>
        </div>
    );
};

export default Home;