function newChar() {
    let c = Math.floor(Math.random() * 59) + 64;
    if (c === 64) c = 32;
    return String.fromCharCode(c);
}

class DNA {
    constructor(num) {
        this.genes = [];
        this.fitness = 0;
        for (let i = 0; i < num; i++) {
            this.genes[i] = newChar()
        }
    }

    getPhrase() {
        return this.genes.join('');
    }

    calcFitness(target) {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.genes[i] === target.charAt(i)) {
                score++;
            }
        }
        //exponential fitness is probably better
        this.fitness = Math.pow(score, 5);
    }

    crossoverA(partner) {
        let child = new DNA(this.genes.length);
        let midpoint = Math.floor(Math.random() * this.genes.length);

        for (let i = 0; i < this.genes.length; i++) {
            if (i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;
    }

    crossoverB(partner) {
        let child = new DNA(this.genes.length);
        for (let i = 0; i < this.genes.length; i++) {
            if (Math.round(Math.random()))
                child.genes[i] = partner.genes[i];
            else
                child.genes[i] = this.genes[i];
        }
        return child;
    }

    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (Math.random() < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }

}

export default DNA