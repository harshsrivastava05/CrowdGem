"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function HotspotCard({ hotspot, showAvgSpend = false }) {
  const [likes, setLikes] = useState(hotspot.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLiked(!isLiked);
    
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    
    // In a real app, you would call an API to update the like status
    // try {
    //   await updateHotspotLikes(hotspot.id, !isLiked);
    // } catch (error) {
    //   // Revert UI if API call fails
    //   setIsLiked(isLiked);
    //   setLikes(isLiked ? likes : likes - 1);
    //   console.error("Failed to update like status", error);
    // }
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: "bg-red-100 text-red-800",
      parks: "bg-green-100 text-green-800",
      nightlife: "bg-purple-100 text-purple-800",
      shopping: "bg-blue-100 text-blue-800",
      culture: "bg-yellow-100 text-yellow-800",
      activities: "bg-indigo-100 text-indigo-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <Link href={`/hotspot/${hotspot.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition duration-300">
        <div className="relative h-48">
          {hotspot.image ? (
            <Image
              src={hotspot.image}
              alt={hotspot.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(hotspot.category)}`}>
              {hotspot.category.charAt(0).toUpperCase() + hotspot.category.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg mb-2 line-clamp-1">{hotspot.name}</h3>
            <button 
              onClick={handleLike}
              className="p-1 focus:outline-none"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor" 
                className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 mb-2 line-clamp-2">{hotspot.description}</p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{hotspot.location || "Location"}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{likes}</span>
            </div>
          </div>
          
          {showAvgSpend && hotspot.avgSpend && (
            <div className="mt-3 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">
                Avg. ${hotspot.avgSpend} per person
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}