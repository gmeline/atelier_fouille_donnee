import  { useState } from "react";
import CanvasDraw from "./components/canvasDraw";
import FileUpload from "./components/fileUpload";
import PredictionDisplay from "./components/predictionDisplay";
import {ArrowRight} from "lucide-react";

function App() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const handleImageSend = (base64: string) => {
    setImageData(base64);
    setPrediction(null); // Remise à zéro de la prédiction quand on change d'image

    // Ici tu peux appeler ton backend ou la logique ML réelle,
    // pour l'instant on ne fait rien (pas de prédiction forcée)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col space-y-6">
      {/* Ligne du haut : Upload gauche, Canvas droite */}
      <div className="flex justify-between space-x-4">
          {/* Canvas */}
          <div className="w-1/2 flex justify-end">
              <CanvasDraw onSendImage={handleImageSend} />
          </div>
        {/* Upload */}
        <div className="w-1/2">
          <FileUpload onSendImage={handleImageSend} />
        </div>
      </div>

        <button className='bg-blue-700 text-white py-2 px-4 rounded-md w-fit mx-auto cursor-pointer'>
            Soumettre
            <ArrowRight size={16} className='mb-0.5 inline ml-2' />
        </button>

      {/* Résultat en bas */}
      <div className="w-full">
        <PredictionDisplay prediction={prediction} imageData={imageData} />
      </div>
    </div>
  )
}

export default App;
