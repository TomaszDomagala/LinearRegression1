import React, {Component} from 'react';

import ReactTooltip from 'react-tooltip';


let points = [], m = 0, b = 0;

class LinearRegressionGD extends Component {
    constructor() {
        super();
        this.state = {
            width: Math.min(600, window.innerWidth - 100, window.innerHeight - 100),
            height: Math.min(600, window.innerWidth - 100, window.innerHeight - 100),
        };
        this.handleClick = this.handleClick.bind(this);
        this.gradientDescent = this.gradientDescent.bind(this);
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
        points.forEach(point => this.drawPoint(point));
    }

    drawLine() {
        const canvas = this.refs.canvas;
        if (!canvas || points.length < 2) return;
        const context = canvas.getContext("2d");
        context.moveTo(0, Math.round(b));
        context.lineTo(Math.round(canvas.width), Math.round(m * canvas.width + b));
        context.stroke();
    }


    draw() {
        this.clearCanvas();
        this.drawLine();
        this.drawPoints();
    }

    handleClick(e) {
        const newPoint = this.getMousePos(e);
        points.push(newPoint);
        this.draw();
    }

    gradientDescent() {
        if (points.length < 2) return;
        const m_learn = 0.0000007;
        const b_learn = 0.1;
        for (let i = 0; i < points.length; i++) {
            const {x, y} = points[i];
            const guess = m * x + b;
            const error = y - guess;
            m = m + error * x * m_learn;
            b = b + error * b_learn;
        }
        console.log(m, b);
        this.draw();
    }

    componentDidMount() {
        const intervalId = setInterval(this.gradientDescent, 10);
        this.setState({width: this.refs.canvasParent.clientWidth, intervalId});


    }
    //TODO naprawic zeby lepiej dzialalo z reactem bo teraz to zjebalem ostro
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        points = [];
        m = 0;
        b = 0;
    }

    render() {
        this.draw();
        return (
            <div className="container">
                <h3>Linear Regression with Ordinary Least Squares</h3>
                <p className={points.length < 2 ? "m-0 tip" : "m-0"}>Create data points by clicking on
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
