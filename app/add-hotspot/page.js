"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createHotspot } from "../../lib/utils/api-client";

export default function AddHotspot() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    description: "",
    image: "",
    addedBy: "Anonymous", // Default value
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    
    // Clear the error for this field when user makes changes
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store the file for later upload
    setImageFile(file);
    
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    // For now, store the file name in formData
    // In a real implementation, you would upload to storage and get a URL
    setFormData((prev) => ({
      ...prev,
      image: `/images/uploads/${file.name}`, // This is a placeholder path
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    
    // For image - in a real app, you'd validate the file type and size too
    if (!formData.image && !imageFile) newErrors.image = "An image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // In a real implementation, you would:
      // 1. Upload the image to a storage service and get a URL
      // 2. Then create the hotspot record with the image URL
      
      // For this example, we'll assume the image path is correctly set in formData
      const hotspot = await createHotspot(formData);
      
      // Success! Navigate to the newly created hotspot
      router.push(`/hotspot/${hotspot._id}`);
    } catch (error) {
      console.error("Error submitting hotspot:", error);
      setSubmitError(error.message || "Failed to create hotspot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Add a New Hotspot</h1>

        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Hotspot Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter the name of the place"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-gray-700 font-medium mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="City, State/Country"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select a category</option>
                <option value="food">Food</option>
                <option value="parks">Parks</option>
                <option value="nightlife">Nightlife</option>
                <option value="shopping">Shopping</option>
                <option value="culture">Culture</option>
                <option value="activities">Activities</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Tell us about this place..."
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2"
              >
                Upload Image
              </label>
              <div 
                className={`border-2 border-dashed ${
                  errors.image ? "border-red-500" : "border-gray-300"
                } rounded-md p-6 text-center cursor-pointer`}
                onClick={() => document.getElementById("image").click()}
              >
                {imagePreview ? (
                  <div className="relative h-48 w-full max-w-md mx-auto">
                    <img 
                      src={imagePreview} 
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
                  id="image" 
                  onChange={handleImageChange} 
                  accept="image/*"
                  className="opacity-0 h-0 w-0" 
                />
                <button
                  type="button"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById("image").click();
                  }}
                >
                  {imageFile ? "Change Image" : "Select File"}
                </button>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="addedBy"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Name (Optional)
              </label>
              <input
                type="text"
                id="addedBy"
                value={formData.addedBy}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Anonymous"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link href="/">
              <button
                type="button"
                className="mr-4 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Hotspot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}