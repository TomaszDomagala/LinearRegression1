import React, {Component} from 'react';

class LinearRegressionOLS extends Component {
    constructor() {
        super();
        this.state = {
            points: []
        };
        this.handleClick = this.handleClick.bind(this)
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
        context.fillStyle = "#61DAFB";
        context.fill();

    }

    calculateLinearRegression() {
        let xAverage = 0, yAverage = 0;
        this.state.points.forEach(point => {
            xAverage += point.x;
            yAverage += point.y;
        });
        xAverage /= this.state.points.length;
        yAverage /= this.state.points.length;

        let numerator = 0, denominator = 0;
        this.state.points.forEach(point => {
            const x = point.x, y = point.y;
            numerator += (x - xAverage) * (y - yAverage);
            denominator += (x - xAverage) * (x - xAverage);
        });

        const m = numerator / denominator;
        const b = yAverage - m * xAverage;
        return {m, b}
    }

    drawLine() {
        const canvas = this.refs.canvas;
        if (!canvas || this.state.points < 2) return;
        const context = canvas.getContext("2d");
        const {m, b} = this.calculateLinearRegression();
        context.moveTo(0, b);
        context.lineTo(canvas.width, m * canvas.width + b);
        context.stroke();
    }

    handleClick(e) {
        const newPoint = this.getMousePos(e);
        // console.log(newPoint);
        this.setState(prevState => ({
            points: [...prevState.points, newPoint]
        }));
    }


    render() {
        let text = 'Points: ';
        this.state.points.forEach(point => {
            text += `(${point.x} ${point.y}) `
        });
        this.clearCanvas();
        this.drawLine();
        this.state.points.forEach(point => this.drawPoint(point));
        return (
            <div className="container">
                <div style={{textAlign: "center"}}>
                    <canvas ref="canvas" width={600} height={600}
                            style={{border: "1px solid #000000", marginTop: "10px"}}
                            onClick={this.handleClick}/>
                </div>
            </div>
        );
    }
}

export default LinearRegressionOLS;
