import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MathJax from 'react-mathjax';
import Home from './components/home';
import About from './components/about';
import AboutMe from './components/aboutMe'

import GeneticAlgorithmText from './components/geneticAlgorithmText'
import LinearRegressionOLS from "./components/linearRegressionOLS"
import LinearRegressionGD from "./components/linearRegressionGD"
import Perceptron from './components/perceptron'

import './App.css';


class App extends Component {


    render() {

        return (
            <Router>
                <div>
                    <MathJax.Provider>
                        <nav className="navbar justify-content-center mb-4">
                            <Link to="/">
                            <span className="navbar-brand mb-0 h1 text-center title"
                                  style={{fontSize: "1.5rem", fontWeight: "bold"}}>
                                ML Storage
                            </span>
                            </Link>
                        </nav>

                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/aboutme" component={AboutMe}/>
                        <Route path="/GeneticAlgorithmText" component={GeneticAlgorithmText}/>
                        <Route path="/LinearRegressionOLS" component={LinearRegressionOLS}/>
                        <Route path="/LinearRegressionGD" component={LinearRegressionGD}/>
                        <Route path="/Perceptron" component={Perceptron}/>
                    </MathJax.Provider>
                </div>
            </Router>
        );
    }
}

export default App;
