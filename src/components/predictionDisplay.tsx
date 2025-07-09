import React from "react";

interface PredictionDisplayProps {
  prediction: string | null;
  imageData: string | null;
}

const PredictionDisplay: React.FC<PredictionDisplayProps> = ({
  prediction,
  imageData,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md mt-4 min-h-[80px]">
      <h2 className="text-xl font-semibold mb-2">Prédiction :</h2>
      {prediction ? (
        <p className="text-2xl font-bold">{prediction}</p>
      ) : (
        <p className="italic text-gray-500">
          Aucune prédiction pour le moment.
        </p>
      )}

      {/* Affiche l'image dessinée ou uploadée */}
      {imageData && (
        <img
          src={imageData}
          alt="Chiffre dessiné ou uploadé"
          className="mt-4 border rounded max-w-full h-auto"
        />
      )}
    </div>
  );
};

export default PredictionDisplay;
