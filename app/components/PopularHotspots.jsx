import HotspotCard from "./HotspotCard";
export default function PopularHotspots() {
  const hotspots = [
    {
      id: 1,
      name: "Central Park",
      location: "New York, NY",
      image: "/images/central-park.jpg",
      likes: 215,
    },
    {
      id: 2,
      name: "Sunset Roost",
      location: "Downtown, LA",
      image: "/images/sunset-roost.png",
      likes: 174,
    },
    {
      id: 3,
      name: "The Artisan Cafe",
      location: "East Side, Austin",
      image: "/images/cafe.png",
      likes: 160,
    },
  ];

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-center mb-6">Popular Hotspots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotspots.map((hotspot) => (
          <HotspotCard key={hotspot.id} hotspot={hotspot} />
        ))}
      </div>
    </div>
  );
}