// app/components/HotspotCard.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function HotspotCard({ hotspot }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <Link href={`/hotspot/${hotspot.id}`}>
        <div className="relative h-48 w-full">
          {hotspot.image.startsWith('http') ? (
            // External image
            <img
              src={hotspot.image}
              alt={hotspot.name}
              className="object-cover w-full h-full"
            />
          ) : (
            // Local image
            <Image
              src={hotspot.image}
              alt={hotspot.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">{hotspot.name}</h3>
          <p className="text-gray-600 mb-4">{hotspot.location}</p>
          <div className="flex items-center">
            <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="blue" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {hotspot.likes}
            </span>
            <span className="ml-auto text-gray-400">{hotspot.likes} likes</span>
          </div>
        </div>
      </Link>
    </div>
  );
}