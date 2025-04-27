import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function HotspotDetail() {
  const router = useRouter();
  const { id } = router.query;

  // In a real app, you would fetch the hotspot data based on the ID
  const hotspot = {
    id: id,
    name: "Central Park",
    location: "New York, NY",
    description:
      "A vast urban park that offers a peaceful retreat from the hustle and bustle of the city. Features walking paths, lakes, and plenty of picnic spots.",
    image: "/images/central-park.jpg",
    likes: 215,
    category: "Parks",
    addedBy: "LocalExplorer",
    reviews: [
      {
        user: "TravelFan",
        text: "Beautiful place to relax and unwind.",
        rating: 5,
      },
      { user: "CityWanderer", text: "A must-visit when in NYC.", rating: 4 },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>

      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        // In hotspot/[id].js, update the image rendering
        <div className="relative h-64 md:h-96 w-full">
          {hotspot.image.startsWith("http") ? (
            <img
              src={hotspot.image}
              alt={hotspot.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              src={hotspot.image}
              alt={hotspot.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{hotspot.name}</h1>
              <p className="text-gray-600">{hotspot.location}</p>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                {hotspot.category}
              </span>
            </div>
            <button className="flex items-center text-gray-500 hover:text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{hotspot.likes}</span>
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">About This Place</h2>
            <p className="text-gray-700">{hotspot.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {hotspot.reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 mb-4 last:border-0"
              >
                <div className="flex justify-between">
                  <p className="font-medium">{review.user}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill={i < review.rating ? "gold" : "gray"}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mt-1">{review.text}</p>
              </div>
            ))}

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition mt-4">
              Add Your Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
