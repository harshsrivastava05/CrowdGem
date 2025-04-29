"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadthingContext } from "../../../lib/uploadthing/uploadthing-context";
// import { useUploadThing } from "../../../lib/uploadthing/uploadthing-hooks";
import LocationSearch from "./LocationSearch";

export default function AddHotspotForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    address: "",
    latitude: "",
    longitude: "",
    averageSpend: "",
    websiteUrl: "",
    contactInfo: "",
  });

  // Use the uploadthing hook
  const { startUpload, isUploading } = useUploadthingContext("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]?.url) {
        submitFormWithImage(res[0].url);
      } else {
        setError("Image upload failed");
        setIsSubmitting(false);
      }
    },
    onUploadError: (error) => {
      setError(`Error uploading image: ${error.message}`);
      setIsSubmitting(false);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create a preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleLocationSelect = (locationData) => {
    setFormData({
      ...formData,
      location: locationData.name,
      address: locationData.address,
      latitude: locationData.lat.toString(),
      longitude: locationData.lng.toString(),
    });
  };

  const submitFormWithImage = async (imageUrl) => {
    try {
      const response = await fetch("/api/hotspots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrl,
          averageSpend: formData.averageSpend ? Number(formData.averageSpend) : 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit hotspot");
      }

      setSuccess(true);
      
      // Redirect after a brief delay to show success message
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate form
    if (!formData.name || !formData.description || !formData.category || !formData.location) {
      setError("Please fill out all required fields");
      setIsSubmitting(false);
      return;
    }

    // Upload image if selected
    if (selectedFile) {
      await startUpload([selectedFile]);
    } else {
      // Submit form without image
      submitFormWithImage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          Hotspot added successfully! Redirecting...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Hotspot Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="food">Food</option>
              <option value="parks">Parks</option>
              <option value="nightlife">Nightlife</option>
              <option value="shopping">Shopping</option>
              <option value="culture">Culture</option>
              <option value="activities">Activities</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="averageSpend" className="block text-sm font-medium text-gray-700">
              Average Spend Per Person ($)
            </label>
            <input
              type="number"
              id="averageSpend"
              name="averageSpend"
              value={formData.averageSpend}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location *
            </label>
            <LocationSearch onSelect={handleLocationSelect} />
            {formData.location && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {formData.location}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">
              Website URL
            </label>
            <input
              type="url"
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
              Contact Information
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              {previewUrl ? (
                <div className="space-y-2 w-full">
                  <div className="relative h-40 w-full">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className={`bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            (isSubmitting || isUploading) ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting || isUploading ? "Submitting..." : "Add Hotspot"}
        </button>
      </div>
    </form>
  );
}