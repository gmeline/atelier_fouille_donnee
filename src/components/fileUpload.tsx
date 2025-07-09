import React from "react";

interface FileUploadProps {
  onSendImage: (base64: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onSendImage }) => {
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
    <div className="border rounded-lg p-4 bg-white shadow-md space-y-2">
      <h2 className="text-xl font-semibold">Importer une image :</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer"
      />
    </div>
  );
};

export default FileUpload;
