export default function SearchBar() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center max-w-2xl mx-auto my-8 gap-3">
            <input
                type="text"
                placeholder="Search a city or location..."
                className="flex-grow py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-sm w-full sm:w-auto"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition shadow-md w-full sm:w-auto">
                Explore
            </button>
        </div>
    );
}