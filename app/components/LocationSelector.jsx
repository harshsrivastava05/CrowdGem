"use client";

import { useState, useEffect, useRef } from "react";
import { SearchIcon, MapPinIcon, XIcon } from "lucide-react";

export default function LocationSelector({ currentLocation, onLocationChange, searchCities }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.length >= 2) {
                setIsLoading(true);
                try {
                    const cities = await searchCities(searchTerm);
                    setSearchResults(cities);
                } catch (error) {
                    console.error("Error searching cities:", error);
                    setSearchResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, searchCities]);

    const handleLocationSelect = (location) => {
        onLocationChange(location);
        setSearchTerm("");
        setIsOpen(false);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setSearchResults([]);
    };

    return (
        <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
            <div className="flex flex-col items-center mb-2">
                <div className="relative w-full">
                    <div className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                        <div className="px-3 py-2">
                            <SearchIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder={currentLocation || "Search for a city..."}
                            className="flex-1 outline-none py-3 px-2 text-gray-700"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsOpen(true);
                            }}
                            onFocus={() => setIsOpen(true)}
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="px-3 py-2"
                                aria-label="Clear search"
                            >
                                <XIcon className="h-5 w-5 text-gray-500" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isOpen && (searchResults.length > 0 || isLoading) && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                    {isLoading ? (
                        <div className="px-4 py-3 text-sm text-gray-500 flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                            Searching...
                        </div>
                    ) : (
                        searchResults.map((result, index) => (
                            <div
                                key={index}
                                className="px-4 py-3 cursor-pointer hover:bg-blue-50 flex items-center"
                                onClick={() => handleLocationSelect(result)}
                                role="button"
                                tabIndex={0}
                            >
                                <MapPinIcon className="h-4 w-4 text-blue-600 mr-2" />
                                <span>{result}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}