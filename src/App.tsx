import {useState} from "react";
import CanvasDraw from "./components/canvasDraw";
import FileUpload from "./components/fileUpload";
import PredictionDisplay from "./components/predictionDisplay";
import {ArrowRight, Settings} from "lucide-react";
import {Network, sigmoid, type TrainingSet, trainNetwork} from "./model.ts";
import trainingSet from "./dataset/training_set_2.json";

export type ImageData = {
    input: number[],
    image: string
};

function App() {
    const [prediction, setPrediction] = useState<number | undefined>();
    const [imageData, setImageData] = useState<ImageData | undefined>();
    const [network] = useState<Network>(new Network([784, 128, 64, 10], sigmoid, 0.01));

    function handleImageSend(input: ImageData) {
        setImageData(input);
        setPrediction(undefined);
    }

    function predict() {
        if (!imageData) return;

        const output = network.predict(imageData.input);
        const predictedValue = output.indexOf(Math.max(...output));
        setPrediction(predictedValue);
    }

    function train() {
        trainNetwork(network, trainingSet as unknown as TrainingSet, 750);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col space-y-6">
            <button className='bg-blue-700 text-white py-2 px-4 rounded-md w-fit mx-auto cursor-pointer'
                    onClick={train}>
                Train network
                <Settings size={16} className='mb-0.5 inline ml-2'/>
            </button>
            <div className="flex justify-between space-x-4">
                <div className="w-1/2 flex justify-end">
                    <CanvasDraw onSendImage={handleImageSend}/>
                </div>
                <div className="w-1/2">
                    <FileUpload onSendImage={handleImageSend}/>
                </div>
            </div>

            <button className='bg-blue-700 text-white py-2 px-4 rounded-md w-fit mx-auto cursor-pointer'
                    onClick={predict}>
                Soumettre
                <ArrowRight size={16} className='mb-0.5 inline ml-2'/>
            </button>

            <div className="w-full">
                <PredictionDisplay prediction={prediction} imageData={imageData?.image}/>
            </div>
        </div>
    )
}

export default App;
