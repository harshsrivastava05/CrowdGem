"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getHotspot, likeHotspot, addReview } from "@/lib/utils/api-client";

export default function HotspotDetail() {
    const params = useParams();
    const id = params.id;

    const [hotspot, setHotspot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [review, setReview] = useState({ user: "", text: "", rating: 5 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function fetchHotspot() {
            try {
                const data = await getHotspot(id);
                setHotspot(data);
            } catch (err) {
                console.error("Error fetching hotspot:", err);
                setError("Failed to load hotspot details");
                // Fallback to sample data
                setHotspot({
                    _id: id,
                    name: "Sample Hotspot",
                    location: "Sample Location",
                    description: "This is a sample description for when data cannot be loaded.",
                    image: "/images/placeholder-hotspot.jpg",
                    likes: 0,
                    category: "Unknown",
                    addedBy: "System",
                    reviews: [],
                });
            } finally {
                setLoading(false);
            }
        }

        fetchHotspot();
    }, [id]);

    const handleLike = async () => {
        try {
            const updatedHotspot = await likeHotspot(id);
            setHotspot(updatedHotspot);
        } catch (err) {
            console.error("Error liking hotspot:", err);
        }
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({
            ...prev,
            [name]: name === "rating" ? parseInt(value, 10) : value,
        }));
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const reviewData = {
                hotspotId: id,
                user: review.user,
                text: review.text,
                rating: review.rating,
            };

            const updatedHotspot = await addReview(reviewData);
            setHotspot(updatedHotspot);
            setShowReviewForm(false);
            setReview({ user: "", text: "", rating: 5 });
        } catch (err) {
            console.error("Error submitting review:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
        );
    }

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

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-64 md:h-96 w-full">
                    <Image
                        src={hotspot.image || "/images/placeholder-hotspot.jpg"}
                        alt={hotspot.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold">{hotspot.name}</h1>
                            <p className="text-gray-600">{hotspot.location}</p>
                            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                                {hotspot.category}
                            </span>
                        </div>
                        <button
                            className="flex items-center text-gray-500 hover:text-red-500"
                            onClick={handleLike}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <span>{hotspot.likes}</span>
                        </button>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2">About This Place</h2>
                        <p className="text-gray-700">{hotspot.description}</p>
                        <p className="text-gray-500 text-sm mt-2">Added by: {hotspot.addedBy}</p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        {hotspot.reviews && hotspot.reviews.length > 0 ? (
                            hotspot.reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-200 pb-4 mb-4 last:border-0"
                                >
                                    <div className="flex justify-between">
                                        <p className="font-medium">{review.user}</p>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill={i < review.rating ? "gold" : "gray"}
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mt-1">{review.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                        )}

                        {!showReviewForm ? (
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition mt-4"
                                onClick={() => setShowReviewForm(true)}
                            >
                                Add Your Review
                            </button>
                        ) : (
                            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-bold text-lg mb-3">Write a Review</h3>
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="user" className="block text-gray-700 font-medium mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="user"
                                            name="user"
                                            value={review.user}
                                            onChange={handleReviewChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
                                            Rating
                                        </label>
                                        <select
                                            id="rating"
                                            name="rating"
                                            value={review.rating}
                                            onChange={handleReviewChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="5">★★★★★ (5/5)</option>
                                            <option value="4">★★★★☆ (4/5)</option>
                                            <option value="3">★★★☆☆ (3/5)</option>
                                            <option value="2">★★☆☆☆ (2/5)</option>
                                            <option value="1">★☆☆☆☆ (1/5)</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="text" className="block text-gray-700 font-medium mb-2">
                                            Your Review
                                        </label>
                                        <textarea
                                            id="text"
                                            name="text"
                                            rows="4"
                                            value={review.text}
                                            onChange={handleReviewChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="mr-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                                            onClick={() => setShowReviewForm(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Review"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}