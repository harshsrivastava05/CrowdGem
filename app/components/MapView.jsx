  import Image from 'next/image';

  export default function MapView() {
    return (
      <div className="rounded-lg overflow-hidden shadow-md mb-12 h-64 md:h-96 relative">
        {/* Using Next.js Image component for the map background */}
        <div className="absolute inset-0">
          <Image
            src="/images/map-background.jpg" // Replace with your map image path
            alt="Map view"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Example pins - positioned over the map */}
        <div className="absolute top-1/3 left-1/4 text-red-500 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red">
            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
          </svg>
        </div>
        <div className="absolute top-2/4 right-1/3 text-red-500 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red">
            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
          </svg>
        </div>
        <div className="absolute bottom-1/3 left-1/2 text-blue-500 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="blue">
            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
          </svg>
        </div>
      </div>
    );
  }