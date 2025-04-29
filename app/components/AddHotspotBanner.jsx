import Link from "next/link";

export default function AddHotspotBanner() {
  return (
    <div className="bg-blue-600 text-white rounded-xl p-8 my-12 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Know a Great Local Spot?</h2>
          <p className="text-blue-100 max-w-2xl">
            Share your favorite places with the community and help others discover hidden gems. Add details about average costs to help travelers budget their visits.
          </p>
        </div>
        <Link
          href="/add-hotspot"
          className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-full shadow transition"
        >
          Add a Hotspot
        </Link>
      </div>
    </div>
  );
}