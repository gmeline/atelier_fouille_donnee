import { useRef, useState } from 'react'
import {getNeuralNetwork, oneHot, sigmoid} from "./index.ts";

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [, setImageBitmap] = useState<ImageBitmap | null>(null)

    const loadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const bitmap = await createImageBitmap(file)
        console.log(bitmap)
        setImageBitmap(bitmap)

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = 28
        canvas.height = 28
        ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0,0, 28,28)

        const imageData = ctx.getImageData(0, 0, 28, 28)
        analyzeImageData(imageData)
    }

    return (
        <>
            <input type="file" accept="image/*" onChange={loadImage} />
            <div className="container">
                <canvas ref={canvasRef} />
            </div>
        </>
    )
}

export default App

// 🔍 Fonction d’analyse à part
function analyzeImageData(imageData: ImageData) {
    const { data } = imageData
    const inputs: number[] = [];

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        const niveauGris = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        inputs.push(niveauGris)
    }

    getNeuralNetwork(inputs, oneHot, 1, sigmoid)
}
