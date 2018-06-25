import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LinearRegressionOLS from "./components/linearRegressionOLS"
import Home from './components/home';
import About from './components/about';
import './App.css';


class App extends Component {


    render() {

        return (
            <Router>
                <div>

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
                    <Route path="/LinearRegressionOLS" component={LinearRegressionOLS}/>
                </div>
            </Router>
        );
    }
}

export default App;
