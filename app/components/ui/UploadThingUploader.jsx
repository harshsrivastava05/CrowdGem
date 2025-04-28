"use client";

import { useCallback, useState } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import { ourFileRouter } from "../../../lib/uploadthing"

const { useUploadThing } = generateReactHelpers(ourFileRouter);

export default function UploadThingUploader({ onUploadComplete }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            setIsUploading(false);
            console.log("Upload response:", res); // Log the complete response
            if (res && res[0]) {
                onUploadComplete(res[0].url);
                console.log("Upload completed, url:", res[0].url);
            }
        },
        onUploadError: (error) => {
            setIsUploading(false);
            console.error("Upload error details:", error);
            console.error("Error type:", typeof error);
            console.error("Error stringified:", JSON.stringify(error, null, 2));
            setError(error.message || "Upload failed");
        },
    });

    const handleFileChange = useCallback((e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Create preview
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        setFile(selectedFile);
        setError("");

        // Clean up the object URL when no longer needed
        return () => URL.revokeObjectURL(objectUrl);
    }, []);

    const handleUpload = useCallback(() => {
        if (!file) return;
        setIsUploading(true);
        startUpload([file]);
    }, [file, startUpload]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];

            // Create preview for the dropped file
            const objectUrl = URL.createObjectURL(droppedFile);
            setPreview(objectUrl);
            setFile(droppedFile);
            setError("");
        }
    }, []);

    return (
        <div>
            <div
                className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${error ? "border-red-500" : "border-gray-300"}`}
                onClick={() => document.getElementById("file-upload").click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                {preview ? (
                    <div className="relative h-48 w-full max-w-md mx-auto">
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-full object-cover rounded"
                        />
                    </div>
                ) : (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">
                            Drag and drop an image file, or click to browse
                        </p>
                    </>
                )}
                <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="opacity-0 h-0 w-0"
                />
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            <div className="mt-4 flex justify-center">
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                >
                    {isUploading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </>
                    ) : (
                        'Upload Image'
                    )}
                </button>
            </div>
        </div>
    );
}