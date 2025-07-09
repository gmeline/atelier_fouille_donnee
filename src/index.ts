export function round(value: number) {
    return Math.round(value * 1000) / 1000;
}

function calculateNewWeight(weight: number, bias: number, error: number, output: number) {
    return round(weight + bias * error * output * (1 - output))
}

function getRdmWeight() {
    return round(Math.random() * 2 - 1);
}

class ActivationFunction {
    name: string;
    formulae: (value: number) => number;

    constructor(name: string, formulae: (value: number) => number) {
        this.name = name;
        this.formulae = formulae;
    }

    calculate(input: number) {
        return this.formulae(input);
    }
}

export const sigmoid = new ActivationFunction('Sigmoid', (value: number) => 1 / (1 + Math.exp(-value)));

class Input {
    value: number;
    weight: number;
    neuron: Neuron | undefined;

    constructor(value: number, weight: number, neuron?: Neuron) {
        this.value = value;
        this.weight = weight;
        this.neuron = neuron;
    }
}

class Neuron {
    biasWeight: number;
    inputs: Input[];
    activationFunction: ActivationFunction;
    output: number;

    constructor(biasWeight: number, inputs: Input[], activationFunction: ActivationFunction) {
        this.biasWeight = biasWeight;
        this.inputs = inputs;
        this.activationFunction = activationFunction;
        this.output = 0;
    }

    calculateValue(bias: number) {
        const totalInputs = round(this.inputs.map((input) => input.value * input.weight).reduce((acc, i) => acc + i, 0));
        const totalWithBias = round(totalInputs + bias * this.biasWeight);
        this.output = round(this.activationFunction.calculate(totalWithBias));
    }
}

const NB_NEURON_PER_LAYER = 20;

export function getNeuralNetwork(values: number[], desiree: number[], bias: number, activationFunction: ActivationFunction) {
    const neurons: Neuron[] = [];

    for (let i = 0; i < NB_NEURON_PER_LAYER; i++) {
        const inputs = values.map((value) => {
            return new Input(value, getRdmWeight())
        });
        neurons.push(new Neuron(getRdmWeight(), inputs, activationFunction))
    }

    neurons.forEach((neuron) => neuron.calculateValue(bias))

    const outptNeurons: Neuron[] = [];
    for (let i = 0; i < 10; i++) {
        const inputs = neurons.map((neuron) => {
            return new Input(neuron.output, getRdmWeight(), neuron)
        })
        outptNeurons.push(new Neuron(getRdmWeight(), inputs, activationFunction))
    }

    let isLooping = false;
    let itedx = 0;

    while (!isLooping && itedx < 1000) {
        let totalError= 0;
        for (let i = 0; i < 10; i++) {
            const target = desiree[i];
            const error = iter(target, bias, outptNeurons[i]);
            totalError += error;
        }

        if(totalError < 0.01){
            isLooping = true;
        }

        itedx++
    }

    const prediction = outptNeurons.map((neuron) => {
        neuron.calculateValue(bias)
        return neuron.output;
    })

    const predictedDigit = prediction.indexOf(Math.max(...prediction))
    console.log(`Chiffre prédit : ${predictedDigit}`)
    if(!isLooping){
        console.warn("Le reseau va pas bien")
    }
}

function iter(desiree: number, bias: number, outputNeuron: Neuron): number {
    // Calcul de la valeur finale
    outputNeuron.calculateValue(bias);

    // Calcul de l'erreur
    const error = round(desiree - outputNeuron.output);

    // Calcul et modification des nouveaus poids
    outputNeuron.inputs.forEach((input) => {
        if (input.neuron) {
            input.weight = round(input.weight + bias * error * (outputNeuron.output * (1 - outputNeuron.output)) * input.neuron.output);

            const neuronError = input.weight * error;

            const neuron = input.neuron;
            neuron.biasWeight = round(neuron.biasWeight + (bias * neuronError * (neuron.output * (1 - neuron.output))));

            neuron.inputs.forEach((input) => {
                input.weight = round(input.weight + bias * neuronError * (neuron.output * (1 - neuron.output)) * input.value);
            });
        }
    })
    outputNeuron.biasWeight = calculateNewWeight(outputNeuron.biasWeight, bias, error, outputNeuron.output);
    return error;
}
const label = 3
export const oneHot = Array.from({ length: 10 }, (_, i) => (i === label ? 1 : 0))
// getNeuralNetwork([0.8, 0.2], oneHot, 1, sigmoid);
