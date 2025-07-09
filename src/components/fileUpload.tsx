import React, {useRef} from "react";

interface FileUploadProps {
  onSendImage: (base64: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onSendImage }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        onSendImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full border border-2 flex flex-col space-y-4 items-center justify-center border-dashed border-gray-200 rounded-lg p-4 space-y-2">
      <h2 className="text-2xl font-bold">Importer une image</h2>
      <button onClick={() => inputRef.current?.click()} className='bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer'>Importer un fichier</button>
      <input
          ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer disabled"
      />
    </div>
  );
};

export default FileUpload;
