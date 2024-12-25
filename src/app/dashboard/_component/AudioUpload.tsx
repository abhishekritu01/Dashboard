import React, { useState } from "react";
import { FaUpload, FaTrash, FaMusic, FaCheckCircle } from "react-icons/fa";

interface AudioUploadProps {}

const AudioUpload: React.FC<AudioUploadProps> = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      setAudioURL(URL.createObjectURL(file));
      setUploadSuccess(null); // Reset success message
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  const handleRemove = () => {
    setAudioFile(null);
    setAudioURL("");
    setUploadSuccess(null);
  };

  const handleUpload = async () => {
    if (!audioFile) return;

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      setIsUploading(true);
      setUploadSuccess(null);

      // Replace with your backend URL
      const response = await fetch("https://your-backend-endpoint.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
      } else {
        setUploadSuccess(false);
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
      setUploadSuccess(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      <div className="border-2 border-dotted border-gray-300 rounded-lg p-6 bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          Upload Your Audio
        </h3>
        {!audioFile ? (
          <div className="text-center">
            <label
              htmlFor="audio-upload"
              className="flex flex-col items-center justify-center h-40 border-2 border-dotted border-blue-400 rounded-md bg-blue-50 hover:bg-blue-100 cursor-pointer"
            >
              <FaUpload className="text-blue-600 text-4xl mb-2" />
              <p className="text-gray-600 text-sm">Drag & drop or click to upload</p>
            </label>
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaMusic className="text-blue-600 text-xl" />
              <p className="text-sm text-gray-600 truncate">{audioFile.name}</p>
            </div>
            <audio
              controls
              src={audioURL}
              className="w-full mb-4 rounded-lg shadow-lg"
            />
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`inline-flex items-center px-4 py-2 text-white rounded-lg shadow-md ${
                  isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-300"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
              <button
                onClick={handleRemove}
                className="inline-flex items-center px-4 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:ring focus:ring-red-300"
              >
                <FaTrash className="mr-2" />
                Remove
              </button>
            </div>
          </div>
        )}
        {uploadSuccess === true && (
          <div className="mt-4 flex items-center justify-center text-green-600">
            <FaCheckCircle className="mr-2" />
            <p className="text-sm">Upload successful!</p>
          </div>
        )}
        {uploadSuccess === false && (
          <div className="mt-4 flex items-center justify-center text-red-600">
            <p className="text-sm">Upload failed. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUpload;
