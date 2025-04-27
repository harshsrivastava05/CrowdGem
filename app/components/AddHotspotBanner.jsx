import Link from 'next/link';

export default function AddHotspotBanner() {
  return (
    <div className="border border-gray-200 rounded-lg p-6 my-12 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h3 className="text-2xl font-bold">Know a secret spot?</h3>
        <p className="text-gray-600">Share it with the world!</p>
      </div>
      <Link
        href="/add-hotspot"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition shadow-md"
      >
        Add Hotspot
      </Link>
    </div>
  );
}