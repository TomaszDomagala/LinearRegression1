import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LinearRegressionOLS from "./components/LinearRegressionOLS.js"
import Home from './components/home';
import About from './components/About';
import styled from "styled-components";
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
        super();
    }

    render() {

        return (
            <Router>
                <div>

                    <nav className="navbar justify-content-center mb-4"
                         style={{backgroundColor: "#FAFAFA", color: "#424242"}}>
                        <Link to="/">
                            <span className="navbar-brand mb-0 h1 text-center title"
                                  style={{fontSize: "1.5rem", fontWeight: "bold"}}>
                                ML Storage
                            </span>
                        </Link>
                    </nav>


                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/LinearRegressionOLS" component={LinearRegressionOLS}/>
                </div>
            </Router>
        );
    }
}

export default App;
