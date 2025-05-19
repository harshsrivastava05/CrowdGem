import { Suspense } from "react";
import LoadingExplore from "./LoadingExplore";
import ExploreContent from "./ExploreContent";

export default function ExplorePage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-8">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Explore Hidden Gems
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover unique local favorites and hidden gems in your area, curated by locals who know best.
                    </p>
                </div>

                <Suspense fallback={<LoadingExplore />}>
                    <ExploreContent />
                </Suspense>
            </div>
        </div>
    );
}
