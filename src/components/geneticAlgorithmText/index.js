import React, {Component} from 'react';

import DNA from "./DNA";


class GeneticAlgorithm extends Component {
    constructor() {
        super();
        this.state = {
            totalGenerations: 1,
            mutationRate: 0.01,
            totalPopulation: 200,
            population: [],
            target: 'genetic algorithm'
        };
        let population = [];
        for (let i = 0; i < this.state.totalPopulation; i++) {
            population[i] = new DNA(this.state.target.length);
            population[i].calcFitness(this.state.target)
        }
        this.state.population = population;
    }

    componentDidMount() {
        this.evolve()
    }

    pickOne(population) {
        let index = 0;
        let r = Math.random();

        while (r > 0) {
            r -= population[index].probability;
            index++;
        }
        return population[index - 1]
    }

    async evolve() {
        setTimeout(() => {
            let population = this.state.population.slice();
            let sum = 0;
            population.forEach(x => {
                sum += x.fitness
            });
            population.forEach(x => x.probability = x.fitness / sum);
            population = population.map(x => {
                let partnerA = this.pickOne(population);
                let partnerB = this.pickOne(population);
                let child = partnerA.crossoverB(partnerB);
                child.mutate(this.state.mutationRate);
                child.calcFitness(this.state.target);
                return child;
            });

            population.sort((a, b) => b.fitness - a.fitness);
            this.setState({population: population, totalGenerations: this.state.totalGenerations + 1});
            if (!population.some(x => x.getPhrase() === this.state.target)) {
                this.evolve()
            }

        }, 5);
    }

    render() {
        return (
            <div className="container">
                <h3>Genetic Algorithm with text finding example <span style={{color: '#C2185B'}}>/WIP</span></h3>
                <p>population: {this.state.totalPopulation} mutation rate: {this.state.mutationRate * 100}% total
                    generations: {this.state.totalGenerations} </p>
                {this.state.population.map((x, i) => {
                    if (x.getPhrase() === this.state.target) {
                        return (<p style={{color: '#C2185B', fontStyle: 'italic'}} key={i}>{x.getPhrase()}</p>)
                    } else {
                        return (<p key={i}>{x.getPhrase()}</p>)
                    }
                })}
            </div>
        );
    }
}

export default GeneticAlgorithm;