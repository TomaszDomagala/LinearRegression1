import React from 'react';
import {Link} from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="container">
            <p><Link to="/GeneticAlgorithmText" className='home-link'>Genetic algorithm with text finding example</Link>
            </p>
            <p><Link to="/LinearRegressionOLS" className='home-link'>Linear Regression with Ordinary Least
                Squares</Link></p>
            <p><Link to="LinearRegressionGD" className='home-link'>Linear Regression with Gradient Descent</Link></p>
            <hr/>
            <p><Link to="/about" className='home-link'>About storage</Link></p>
            <p><Link to="/aboutme" className='home-link'>About me</Link></p>


        </div>
    );
};

export default Home;