import HotspotCard from "./HotspotCard";
export default function PopularHotspots() {
  const hotspots = [
    {
      id: 1,
      name: "Central Park",
      location: "New York, NY",
      image: "https://www.parkcentralny.com/wp-content/uploads/2024/03/PCH_Hero_Home-Explore.jpg",
      likes: 215,
    },
    {
      id: 2,
      name: "Sunset Roost",
      location: "Downtown, LA",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHvKRmMkMew1q1Y2EcvjnQW3z7rCAnQ0ZS0g&s",
      likes: 174,
    },
    {
      id: 3,
      name: "The Artisan Cafe",
      location: "East Side, Austin",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Z8-TsYwjlBVOBfG047A3hWJ2Z6xXg6Yiqw&s",
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