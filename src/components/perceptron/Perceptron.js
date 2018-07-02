import math from 'mathjs'


const activation_function = x => {
    if (x > -0) {
        return 1;
    }
    else {
        return -1;
    }
};

class PerceptronModel {
    constructor() {
        this.weights = [];
        for (let i = 0; i < 2; i++) {
            this.weights[i] = math.random(-1, 1)
        }
    }

    //Feedforward kind of
    guess(...inputs) {
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) {
            sum += this.weights[i] * inputs[i]
        }
        const output = activation_function(sum);
        return output;
    }

    //Backpropagation
    train(target, ...inputs) {
        let guess = this.guess(...inputs);
        let error = target - guess;
        const learning_rate = 0.1;

        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += error * inputs[i] * learning_rate;
        }
    }


}

export default PerceptronModel