"use client";

import { useState, useEffect, useRef } from "react";
import { searchCities } from "../../../lib/utils/location-utils";

export default function CityAutoSuggest({ value, onChange, error }) {
    const [inputValue, setInputValue] = useState(value || "");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (inputValue.length < 2) {
                setSuggestions([]);
                return;
            }

            setIsLoading(true);
            try {
                const results = await searchCities(inputValue);
                setSuggestions(results);
            } catch (error) {
                console.error("Error fetching city suggestions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [inputValue]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onChange({ target: { id: "location", value } });
        setShowSuggestions(true);
    };

    const selectSuggestion = (suggestion) => {
        setInputValue(suggestion);
        onChange({ target: { id: "location", value: suggestion } });
        setShowSuggestions(false);
    };

    return (
        <div className="relative" ref={suggestionsRef}>
            <input
                type="text"
                id="location"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
                className={`w-full px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="City, State/Country"
                autoComplete="off"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {/* Loading indicator */}
            {isLoading && showSuggestions && (
                <div className="absolute right-3 top-3">
                    <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                </div>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => selectSuggestion(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}