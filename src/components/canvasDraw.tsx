import React, { useRef } from "react";

interface CanvasDrawProps {
  onSendImage: (base64: string) => void;
}

const CanvasDraw: React.FC<CanvasDrawProps> = ({ onSendImage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    isDrawing.current = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSend = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const base64 = canvas.toDataURL("image/png");
    onSendImage(base64);
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg p-4 bg-white shadow-xs space-y-2">
      <h2 className="text-xl font-bold">Dessine un chiffre</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border-2 border-gray-200 rounded-md border-dotted bg-white cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className="space-x-2">
        <button
          onClick={handleSend}
          className="cursor-pointer bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
        <button
          onClick={clearCanvas}
          className="cursor-pointer border border-gray-200 bg-gray-50 text-black px-4 py-1 rounded hover:bg-gray-100"
        >
          Effacer
        </button>
      </div>
    </div>
  );
};

export default CanvasDraw;
