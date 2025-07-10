import React, {useRef} from "react";
import type {ImageData} from "../App.tsx";

interface FileUploadProps {
    onSendImage: (input: ImageData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({onSendImage}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result !== "string") return;

            const img = new Image();
            img.onload = () => {
                // Crée un canvas temporaire 28x28
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = 28;
                tempCanvas.height = 28;
                const ctx = tempCanvas.getContext("2d");
                if (!ctx) return;

                // Redimensionne et dessine l'image
                ctx.drawImage(img, 0, 0, 28, 28);
                const imgData = ctx.getImageData(0, 0, 28, 28);
                const input: number[] = [];

                // Convertit les pixels en 0 (blanc) ou 1 (noir)
                for (let i = 0; i < imgData.data.length; i += 4) {
                    const [r, g, b] = [
                        imgData.data[i],
                        imgData.data[i + 1],
                        imgData.data[i + 2],
                    ];
                    const grayscale = (r + g + b) / 3;
                    input.push(grayscale < 128 ? 1 : 0);
                }

                const base64 = tempCanvas.toDataURL("image/png");
                onSendImage({input, image: base64});
            };

            img.src = result;
        };

        reader.readAsDataURL(file);
    };

    return (
        <div
            className="h-full border border-2 flex flex-col space-y-4 items-center justify-center border-dashed border-gray-200 rounded-lg p-4">
            <h2 className="text-2xl font-bold">Importer une image</h2>
            <button
                onClick={() => inputRef.current?.click()}
                className="bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer"
            >
                Importer un fichier
            </button>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default FileUpload;
