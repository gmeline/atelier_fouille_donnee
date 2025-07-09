import React, { useState } from "react";
import CanvasDraw from "./canvasDraw";
import FileUpload from "./fileUpload";
import PredictionDisplay from "./predictionDisplay";

const DigitRecognizer: React.FC = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const handleImageSend = async (base64: string) => {
    try {
      setImageData(base64); // pour affichage
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Erreur lors de la prédiction :", error);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <FileUpload onSendImage={handleImageSend} />
        <CanvasDraw onSendImage={handleImageSend} />
      </div>
      <PredictionDisplay prediction={prediction} imageData={imageData || ""} />
    </div>
  );
};

export default DigitRecognizer;
