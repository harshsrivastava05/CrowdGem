export default function CategoryButtons() {
  const categories = [
    { name: "Food", icon: "🍽️" },
    { name: "Parks", icon: "🌳" },
    { name: "Nightlife", icon: "🍸" },
    { name: "Shopping", icon: "🛍️" }
  ];

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Explore hotspots near you</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            className="flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-gray-100 border border-gray-200 rounded-full shadow-sm transition"
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}