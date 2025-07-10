function getRdmWeight() {
    return Math.round((Math.random() * 2 - 1) * 1000) / 1000;
}

type Equation = (value: number) => number;
export type TrainingSet = { input: number[], realValue: number }[][];

class ActivationFunction {
    name: string;
    formula: Equation;
    derivative: Equation;

    constructor(name: string, formula: Equation, derivative: Equation) {
        this.name = name;
        this.formula = formula;
        this.derivative = derivative;
    }

    calculate(x: number) {
        return this.formula(x);
    }

    derive(x: number) {
        return this.derivative(x);
    }
}

export const sigmoid = new ActivationFunction(
    'Sigmoid',
    x => 1 / (1 + Math.exp(-x)),
    x => {
        const fx = 1 / (1 + Math.exp(-x));
        return fx * (1 - fx);
    }
);

export const relu = new ActivationFunction(
    'ReLU',
    x => Math.max(0, x),
    x => (x > 0 ? 1 : 0)
);

class Neuron {
    weights: number[];
    bias: number;
    activation: ActivationFunction;
    output: number;
    input: number[];
    z: number;

    constructor(inputSize: number, activation: ActivationFunction) {
        this.weights = Array.from({length: inputSize}, getRdmWeight);
        this.bias = getRdmWeight();
        this.activation = activation;
        this.output = 0;
        this.input = [];
        this.z = 0;
    }

    forward(inputs: number[]) {
        this.input = inputs;
        this.z = this.weights.reduce((sum, w, i) => sum + w * inputs[i], this.bias);
        this.output = this.activation.calculate(this.z);
        return this.output;
    }

    updateWeights(delta: number, learningRate: number) {
        this.weights = this.weights.map((w, i) => w + learningRate * delta * this.input[i]);
        this.bias = this.bias + learningRate * delta;
    }
}

class Layer {
    neurons: Neuron[];
    outputs: number[];

    constructor(nbNeurons: number, inputSize: number, activation: ActivationFunction) {
        this.neurons = Array.from({length: nbNeurons}, () => new Neuron(inputSize, activation));
        this.outputs = [];
    }

    forward(inputs: number[]) {
        this.outputs = this.neurons.map(neuron => neuron.forward(inputs));
        return this.outputs;
    }

    backward(deltas: number[], learningRate: number) {
        return this.neurons.map((neuron, i) => {
            const delta = deltas[i];
            neuron.updateWeights(delta, learningRate);
            return neuron.weights.map((w) => w * delta);
        }).reduce((acc, val) => acc.map((sum, i) => sum + val[i]), new Array(this.neurons[0].weights.length).fill(0));
    }
}

export class Network {
    learningRate: number;
    layers: Layer[];

    constructor(structure: number[], activation: ActivationFunction, learningRate = 0.5) {
        this.learningRate = learningRate;
        this.layers = [];

        for (let i = 0; i < structure.length - 1; i++) {
            this.layers.push(new Layer(structure[i + 1], structure[i], activation));
        }
    }

    predict(inputs: number[]) {
        return this.layers.reduce((inp, layer) => layer.forward(inp), inputs);
    }

    train(inputs: number[], desirees: number[]) {
        const outputs = [inputs];
        let current = inputs;

        for (const layer of this.layers) {
            current = layer.forward(current);
            outputs.push(current);
        }

        let deltas = outputs[outputs.length - 1].map((o, i) => {
            const z = this.layers[this.layers.length - 1].neurons[i].z;
            return (desirees[i] - o) * sigmoid.derive(z);
        });

        for (let l = this.layers.length - 1; l >= 0; l--) {
            deltas = this.layers[l].backward(deltas, this.learningRate);
        }
    }
}

function toOneHot(expected: number, size = 10) {
    const arr = new Array(size).fill(0);
    arr[expected] = 1;
    return arr;
}

export function trainNetwork(network: Network, trainingSet: TrainingSet, nbTrainImages: number) {
    for (let i = 0; i < nbTrainImages; i++) {
        for (let digit = 0; digit < 10; digit++) {
            network.train(trainingSet[digit][i].input, toOneHot(trainingSet[digit][i].realValue));
        }
    }
    const percentages: number[] = [];
    for (let i = 0; i < 10; i++) {
        let nbGoods = 0;
        for (let y = 0; y < 100; y++) {
            const output = network.predict(trainingSet[i][y].input);
            const prediction = output.indexOf(Math.max(...output));
            if (prediction === trainingSet[i][y].realValue) nbGoods++;
        }
        percentages.push(nbGoods);
    }
    const average = percentages.reduce((acc, i) => acc + i, 0) / percentages.length;
    console.log("Robustesse par digit: " + JSON.stringify(percentages));
    console.log("Robustesse totale: " + average);
}
