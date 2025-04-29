"use client";

import { useState } from "react";
import { Heart, Star, MapPin, DollarSign, User } from "lucide-react";
import { likeHotspot } from "../../lib/utils/api-client";

export default function HotspotCard({ hotspot }) {
    const [likes, setLikes] = useState(hotspot.likes || 0);
    const [isLiking, setIsLiking] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const categoryColors = {
        food: "bg-orange-100 text-orange-800",
        parks: "bg-green-100 text-green-800",
        nightlife: "bg-purple-100 text-purple-800",
        shopping: "bg-pink-100 text-pink-800",
        culture: "bg-yellow-100 text-yellow-800",
        activities: "bg-blue-100 text-blue-800",
    };

    const categoryColor = categoryColors[hotspot.category] || "bg-gray-100 text-gray-800";

    const handleLike = async () => {
        if (isLiking) return;

        setIsLiking(true);
        try {
            await likeHotspot(hotspot.id);
            setLikes(prev => prev + 1);
        } catch (error) {
            console.error("Error liking hotspot:", error);
            // Fallback to just incrementing locally if API fails
            setLikes(prev => prev + 1);
        } finally {
            setIsLiking(false);
        }
    };

    // Calculate average rating from reviews if available
    const averageRating = hotspot.reviews && hotspot.reviews.length > 0
        ? hotspot.reviews.reduce((acc, review) => acc + review.rating, 0) / hotspot.reviews.length
        : 0;

    // Truncate description for initial display
    const shortDescription = hotspot.description.length > 120
        ? `${hotspot.description.substring(0, 120)}...`
        : hotspot.description;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={hotspot.image}
                    alt={hotspot.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                    <button
                        onClick={handleLike}
                        disabled={isLiking}
                        className={`flex items-center justify-center bg-white rounded-full p-2 shadow-md transition-transform ${isLiking ? 'opacity-50' : 'hover:scale-110'}`}
                        aria-label="Like this place"
                    >
                        <Heart className={`h-5 w-5 ${likes > hotspot.likes ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                    </button>
                </div>
                <div className="absolute bottom-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                        {hotspot.category.charAt(0).toUpperCase() + hotspot.category.slice(1)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{hotspot.name}</h3>
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-600 ml-1">
                            {averageRating > 0 ? averageRating.toFixed(1) : "New"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{hotspot.location}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mt-1">
                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                    <span>Avg. ₹{hotspot.averageSpend} per person</span>
                </div>

                <div className="mt-3">
                    <p className="text-gray-600 text-sm">
                        {showFullDescription ? hotspot.description : shortDescription}
                        {hotspot.description.length > 120 && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="text-blue-600 hover:text-blue-800 text-sm ml-1"
                            >
                                {showFullDescription ? "Read less" : "Read more"}
                            </button>
                        )}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>Added by {hotspot.addedBy}</span>
                    </div>
                    <div className="flex items-center">
                        <Heart className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-gray-600">{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}