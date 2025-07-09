function round(value: number) {
    return Math.round(value * 1000) / 1000;
}

function getRdmWeight() {
    return round(Math.random() * 2 - 1);
}

type Equation = (value: number) => number;

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

const sigmoid = new ActivationFunction(
    'Sigmoid',
    x => 1 / (1 + Math.exp(-x)),
    x => {
        const fx = 1 / (1 + Math.exp(-x));
        return fx * (1 - fx);
    }
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
        this.z = round(this.weights.reduce((sum, w, i) => sum + w * inputs[i], this.bias));
        this.output = round(this.activation.calculate(this.z));
        return this.output;
    }

    updateWeights(delta: number, learningRate: number) {
        this.weights = this.weights.map((w, i) => round(w + learningRate * delta * this.input[i]));
        this.bias = round(this.bias + learningRate * delta);
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

class Network {
    learningRate: number;
    layers: Layer[];

    constructor(structure: number[], activation = sigmoid, learningRate = 0.5) {
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
            return round((desirees[i] - o) * sigmoid.derive(z));
        });

        for (let l = this.layers.length - 1; l >= 0; l--) {
            deltas = this.layers[l].backward(deltas, this.learningRate);
        }
    }
}

function generateDigitBitmap(digit: number): number[] {
    const base = new Array(49).fill(0);

    const patterns: Record<number, number[]> = {
        0: [1, 2, 3, 8, 15, 22, 29, 36, 43, 44, 45],
        1: [3, 10, 17, 24, 31, 38, 45],
        2: [1, 2, 3, 10, 17, 24, 25, 26, 27, 34, 41, 42, 43],
        3: [1, 2, 3, 10, 17, 24, 25, 26, 27, 34, 41, 42, 43],
        4: [5, 12, 19, 26, 27, 28, 35, 42],
        5: [1, 2, 3, 8, 9, 10, 17, 24, 25, 26, 33, 40, 41, 42],
        6: [2, 3, 4, 9, 16, 23, 24, 25, 26, 33, 40, 41, 42],
        7: [1, 2, 3, 10, 17, 24, 31, 38],
        8: [2, 3, 4, 9, 16, 23, 24, 25, 26, 30, 37, 38, 39],
        9: [1, 2, 3, 10, 17, 24, 25, 26, 27, 34, 41]
    };

    const indices = patterns[digit] || [];
    for (let i of indices) {
        base[i] = 1;
    }

    return base;
}

function addNoise(input: number[], noiseLevel: number = 0.1): number[] {
    return input.map(v => {
        if (Math.random() < noiseLevel) {
            return Math.random();
        }
        return v;
    });
}

function generateDataset(samplesPerDigit: number = 10): { input: number[], realValue: number }[] {
    const dataset: { input: number[], realValue: number }[] = [];

    for (let digit = 0; digit <= 9; digit++) {
        const base = generateDigitBitmap(digit);
        for (let i = 0; i < samplesPerDigit; i++) {
            dataset.push({
                input: addNoise(base, 0.2),
                realValue: digit
            });
        }
    }

    return dataset;
}

function toOneHot(expected: number, size = 10) {
    const arr = new Array(size).fill(0);
    arr[expected] = 1;
    return arr;
}

const net = new Network([49, 20, 10], sigmoid, 0.5);
const dataset = generateDataset(10)

for (let epoch = 0; epoch < 1000; epoch++) {
    dataset.forEach(sample => {
        net.train(sample.input, toOneHot(sample.realValue));
    });
}

let totalCorrect = 0;
for (let i = 0; i < dataset.length; i++) {
    const test = dataset[1];
    const result = net.predict(test.input);
    const predicted = result.indexOf(Math.max(...result));
    if (predicted === test.realValue) {
        totalCorrect++;
    } else {
        console.log('Erreur');
        console.log('Sortie brute:', result);
        console.log('Chiffre prédit:', predicted);
        console.log('Label attendu:', test.realValue);
    }
}

console.log('Pourcentage bonnes réponses: ' + round(totalCorrect *100 / dataset.length))
