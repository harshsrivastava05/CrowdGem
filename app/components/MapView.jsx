import Image from 'next/image';

export default function MapView() {
  return (
    <div className="rounded-lg overflow-hidden shadow-md mb-12 h-64 md:h-96 relative">
  
      <div className="absolute inset-0">
        <Image
          src="/images/map-background.jpg" 
          alt="Map view"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}