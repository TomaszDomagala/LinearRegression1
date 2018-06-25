import React, {Component} from 'react';
import './linearRegressionOLS.css'
import ReactTooltip from 'react-tooltip';

class LinearRegressionOLS extends Component {
    constructor() {
        super();
        this.state = {
            width: Math.min(600, window.innerWidth - 100, window.innerHeight - 100),
            height: Math.min(600, window.innerWidth - 100, window.innerHeight - 100),
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
        context.fillStyle = "#C2185B";
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

    componentDidMount() {
        //TODO aktualnie canvas jest renderowany dwa razy: raz z width z this.state a drugi z refa fajnie jakby to usprawnic dla clean codu
        if (this.refs.canvasParent && this.refs.canvasParent.clientWidth !== this.state.width)
            this.setState({width: this.refs.canvasParent.clientWidth})

    }

    render() {
        this.clearCanvas();
        this.drawLine();
        this.state.points.forEach(point => this.drawPoint(point));
        return (
            <div className="container"><h3>Linear Regression with Ordinary Least Squares</h3>
                <div style={{textAlign: "center"}}>

                    <div ref="canvasParent">
                        <canvas ref="canvas" width={this.state.width} height={this.state.height}
                                style={{border: "1px solid #E0E0E0", marginTop: "10px"}}
                                onClick={this.handleClick}/>
                    </div>
                </div>
                <p>This is good method only for linear data sets. Check
                    <a target="_blank" rel="noopener noreferrer" className="link" data-tip="Anscombe's quartet"
                       href="https://en.wikipedia.org/wiki/Anscombe%27s_quartet#/media/File:Anscombe%27s_quartet_3.svg"
                    > this</a> out to see what i mean.</p>
                <h5>Resources:</h5>
                <p>Daniel Shiffman's videos on this topic
                    <a rel="noopener noreferrer" className="link" target="_blank"
                       href="https://www.youtube.com/watch?v=szXbuO3bVRk"> part 1 </a>
                    and <a rel="noopener noreferrer" className="link" target="_blank"
                           href="https://www.youtube.com/watch?v=_cXuvTQl090"> part
                        2</a>.
                </p>
                <p>More on <a rel="noopener noreferrer" className="link" target="_blank"
                       href="https://scholar.google.pl/scholar?q=Ordinary+Least+Squares&hl=pl&as_sdt=0&as_vis=1&oi=scholart">
                    Google Scholar</a>.</p>
                <ReactTooltip effect="solid"/>
            </div>
        );
    }
}

export default LinearRegressionOLS;
