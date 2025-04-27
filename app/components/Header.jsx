export default function Header() {
    return (
      <header className="w-full bg-gradient-to-b from-gray-200 to-transparent py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Hidden Gems Around You!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-2">
          Crowd-sourced hotspots – cafes, parks, nightlife, and more.
        </p>
        <p className="text-lg md:text-xl text-gray-700">
          Explore your city like a local.
        </p>
      </header>
    );
  }