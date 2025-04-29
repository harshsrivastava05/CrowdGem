"use client";

import {
    Coffee,
    TreePine,
    Music,
    ShoppingBag,
    Palette,
    Bike,
    Globe
} from "lucide-react";

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
    const categories = [
        { id: "all", name: "All", icon: Globe },
        { id: "food", name: "Food", icon: Coffee },
        { id: "parks", name: "Parks", icon: TreePine },
        { id: "nightlife", name: "Nightlife", icon: Music },
        { id: "shopping", name: "Shopping", icon: ShoppingBag },
        { id: "culture", name: "Culture", icon: Palette },
        { id: "activities", name: "Activities", icon: Bike },
    ];

    return (
        <div className="mb-8">
            <p className="text-center mb-4 text-gray-600 font-medium">Filter by category</p>
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`flex flex-col items-center px-4 py-3 rounded-lg transition-all ${isSelected
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                                }`}
                        >
                            <Icon className={`h-5 w-5 mb-1 ${isSelected ? "text-white" : "text-blue-600"}`} />
                            <span className="text-sm">{category.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}