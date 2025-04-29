"use client";

import { useState, useEffect, useRef } from "react";
import { searchCities } from "../../../lib/utils/location-utils";

export default function LocationSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        try {
          const cities = await searchCities(query);
          setSuggestions(cities);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name || suggestion);
    
    // If suggestion is just a string (city name), create a simplified location object
    if (typeof suggestion === 'string') {
      onSelect({
        name: suggestion,
        address: suggestion,
        lat: 0, // These would be populated with real data in a production app
        lng: 0,
      });
    } else {
      // If suggestion is a location object with all data, pass it directly
      onSelect(suggestion);
    }
    
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={suggestionRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city or location..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {typeof suggestion === 'string' ? suggestion : suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}