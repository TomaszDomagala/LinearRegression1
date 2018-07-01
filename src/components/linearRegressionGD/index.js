import React, {Component} from 'react';

import ReactTooltip from 'react-tooltip';
import {map} from '../../utils'

let m = 0, b = 0;

class LinearRegressionGD extends Component {
    constructor() {
        super();
        this.state = {
            width: Math.min(600, window.innerWidth - 100, window.innerHeight - 100),
            height: Math.min(600, window.innerWidth - 100, window.innerHeight - 100),
            points: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.gradientDescent = this.gradientDescent.bind(this);
    }

    mapPointToCalc(point) {
        const {width, height} = this.state;
        const {x, y} = point;
        return {
            x: map(x, 0, width, 0, width / 10),
            y: map(y, 0, height, 0, height / 10)
        }
    }

    mapPointToDisplay(point) {
        const {width, height} = this.state;
        const {x, y} = point;
        return {
            x: map(x, 0, width / 10, 0, width),
            y: map(y, 0, height / 10, 0, height)
        }
    }


    getMousePos(e) {
        const canvas = this.refs.canvas;
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    clearCanvas() {
        const canvas = this.refs.canvas;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawPoint(point) {
        const canvas = this.refs.canvas;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        context.beginPath();
        context.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        context.fillStyle = "#C2185B";
        context.fill();

    }

    drawPoints() {
        this.state.points.forEach(point => this.drawPoint(this.mapPointToDisplay(point)));
    }

    drawLine() {
        const canvas = this.refs.canvas;
        if (!canvas || this.state.points.length < 2) return;
        const context = canvas.getContext("2d");
        const displayB = map(b, 0, this.state.height / 10, 0, this.state.height);
        context.moveTo(0, Math.round(displayB));
        context.lineTo(Math.round(canvas.width), Math.round(m * canvas.width + displayB));
        context.stroke();
    }

    draw() {
        this.clearCanvas();
        this.drawLine();
        this.drawPoints();
    }

    handleClick(e) {
        const newPoint = this.getMousePos(e);

        this.setState(prevState => ({points: [...prevState.points, this.mapPointToCalc(newPoint)]}));
        this.draw();
    }

    gradientDescent() {
        if (this.state.points.length < 2) return;


        const m_learning_rate = 0.0001;
        const b_learning_rate = 0.05;
        this.state.points.forEach(point => {
            const x = point.x, y = point.y;
            const guess = m * x + b;
            const error = y - guess;
            m = m + error * x * m_learning_rate;
            b = b + error * b_learning_rate;
        });

        this.draw();
    }

    componentDidMount() {
        const intervalId = setInterval(this.gradientDescent, 10);
        this.setState({width: this.refs.canvasParent.clientWidth, intervalId});


    }

    //TODO naprawic zeby lepiej dzialalo z reactem bo teraz to zjebalem ostro
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        m = 0;
        b = 0;
    }

    render() {
        this.draw();
        return (
            <div className="container">
                <h3>Linear Regression with Gradient Descent</h3>
                <p className={this.state.points.length < 2 ? "m-0 tip" : "m-0"}>Create data points by clicking on
                    canvas</p>
                <div style={{textAlign: "center"}}>

                    <div ref="canvasParent">
                        <canvas ref="canvas" width={this.state.width} height={this.state.height}
                                style={{border: "1px solid #E0E0E0", marginTop: "10px"}}
                                onClick={this.handleClick}/>
                    </div>
                </div>

                <ReactTooltip effect="solid"/>
            </div>
        );
    }
}

export default LinearRegressionGD;
