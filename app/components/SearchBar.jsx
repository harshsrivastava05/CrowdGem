"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchCities } from '../../lib/utils/location-utils';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        const cities = await searchCities(query);
        setSuggestions(cities);
        setShowSuggestions(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?location=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-6 rounded-r-full">
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-grow" ref={suggestionRef}>
          <input
            type="text"
            placeholder="Enter a city or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search location"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-r-lg transition"
        >
          Explore
        </button>
      </form>
    </div>
  );
}