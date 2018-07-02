import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import PerceptronModel from './Perceptron.js'
import {Button} from "../../styledComponents";

let neuron;

class Perceptron extends Component {
    constructor() {
        super();
        neuron = new PerceptronModel();
        this.state = {
            width: Math.min(600, window.innerWidth - 100, window.innerHeight - 100),
            height: Math.min(600, window.innerWidth - 100, window.innerHeight - 100),
            points: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.trainNeuron = this.trainNeuron.bind(this);
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
        const context = canvas.getContext("2d");
        context.beginPath();
        context.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        context.lineWidth = 2;
        if (point.label === 1) {
            if (point.label === neuron.guess(point.x, point.y)) {
                context.strokeStyle = "#009688"
            } else {
                context.strokeStyle = "#C2185B"
            }
            context.stroke();
        } else {
            if (point.label === neuron.guess(point.x, point.y)) {
                context.fillStyle = "#009688"
            } else {
                context.fillStyle = "#C2185B"
            }
            context.fill();
        }
    }

    drawPoints() {
        this.state.points.forEach(point => this.drawPoint(point));
    }

    drawLine() {
        const canvas = this.refs.canvas;
        if (!canvas || this.state.points < 2) return;
        const context = canvas.getContext("2d");
        context.strokeStyle = "#000";
        context.lineWidth = 1;
        context.moveTo(0, 0);
        context.lineTo(canvas.width, canvas.height);
        context.stroke();
    }

    draw() {
        this.clearCanvas();
        this.drawLine();
        this.drawPoints();
    }

    trainNeuron() {
        this.state.points.forEach(({x, y, label}) => {
            neuron.train(label, x, y);
        });
        this.forceUpdate()
    }

    handleClick(e) {
    }

    componentDidMount() {
        //TODO aktualnie canvas jest renderowany dwa razy: raz z width z this.state a drugi z refa fajnie jakby to usprawnic dla clean codu
        const points = [];
        const {height} = this.state;
        const width = Math.min(this.refs.canvasParent.clientWidth, 1110);

        for (let i = 0; i < 100; i++) {
            const x = Math.floor(Math.random() * this.refs.canvasParent.clientWidth) + 1;
            const y = Math.floor(Math.random() * this.state.height) + 1;
            const label = x * height / width > y ? 1 : -1;
            points.push({x, y, label})
        }
        this.setState({width, points}, this.draw);
    }

    drawModel() {
        const canvas = this.refs.modelcanvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px serif";
        ctx.textAlign = "center";
        const drawCircle = (width, height, radius) => {
            ctx.beginPath();
            ctx.arc(width, height, radius, 0, 2 * Math.PI);
            ctx.stroke();
        };
        const drawLine = (fromX, fromY, toX, toY) => {
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();
        };

        drawCircle(50, 50, 30);
        drawCircle(50, 150, 30);
        drawCircle(150, 100, 30);
        ctx.fillText("x", 50, 60);
        ctx.fillText("y", 50, 160);
        ctx.fillText("Σ", 150, 110);
        ctx.fillText('out', 250, 108);
        drawLine(80, 50, 125, 85);
        drawLine(80, 150, 125, 115);
        drawLine(180, 100, 220, 100);
        ctx.font = "16px serif";

        ctx.fillText((Math.round(neuron.weights[0] * 100) / 100).toString(), 110, 50);
        ctx.fillText((Math.round(neuron.weights[1] * 100) / 100).toString(), 110, 160)
    }

    render() {
        this.draw();
        this.drawModel();
        return (
            <div className="container">
                <h3>Points Clasification with Perceptron</h3>
                <div className='text-center'>
                    <div ref="canvasParent">
                        <canvas ref="canvas" width={this.state.width} height={this.state.height}
                                style={{border: "1px solid #E0E0E0", marginTop: "10px"}}
                                onClick={this.handleClick}/>
                    </div>
                </div>
                <div className="row">
                    <div className='col'>
                        {this.state.points.filter(({x, y, label}) => label !== neuron.guess(x, y)).length}
                    </div>
                    <div className='col text-right'>
                        <Button onClick={this.trainNeuron}>Train!</Button>
                    </div>
                    <div className="col">
                        <canvas ref="modelcanvas" width={300} height={200}/>
                    </div>

                </div>
                <ReactTooltip effect="solid"/>
            </div>
        );
    }
}

export default Perceptron;
