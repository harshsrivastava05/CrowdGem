"use client";

import { useState } from 'react';

export default function SearchFilters({ onFilterChange }) {
    const [category, setCategory] = useState("");
    const [minBudget, setMinBudget] = useState("");
    const [maxBudget, setMaxBudget] = useState("");
    const [sortBy, setSortBy] = useState("likes");

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        onFilterChange({ category: newCategory });
    };

    const handleMinBudgetChange = (e) => {
        const value = e.target.value;
        setMinBudget(value);
        onFilterChange({ minBudget: value });
    };

    const handleMaxBudgetChange = (e) => {
        const value = e.target.value;
        setMaxBudget(value);
        onFilterChange({ maxBudget: value });
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        onFilterChange({ sortBy: value });
    };

    const clearFilters = () => {
        setCategory("");
        setMinBudget("");
        setMaxBudget("");
        setSortBy("likes");
        onFilterChange({
            category: "",
            minBudget: "",
            maxBudget: "",
            sortBy: "likes"
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="food">Food</option>
                    <option value="parks">Parks</option>
                    <option value="nightlife">Nightlife</option>
                    <option value="shopping">Shopping</option>
                    <option value="culture">Culture</option>
                    <option value="activities">Activities</option>
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Budget Range</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        value={minBudget}
                        onChange={handleMinBudgetChange}
                        min="0"
                        placeholder="Min $"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span>to</span>
                    <input
                        type="number"
                        value={maxBudget}
                        onChange={handleMaxBudgetChange}
                        min={minBudget || "0"}
                        placeholder="Max $"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Sort By</label>
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="likes">Most Popular</option>
                    <option value="priceAsc">Price (Low to High)</option>
                    <option value="priceDesc">Price (High to Low)</option>
                </select>
            </div>

            <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition"
            >
                Clear All Filters
            </button>
        </div>
    );
}