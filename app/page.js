import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import CategoryButtons from "./components/CategoryButtons";
import PopularHotspots from "./components/features/PopularHotspots";
import AddHotspotBanner from "./components/AddHotspotBanner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <MapView />
        <CategoryButtons />
        <PopularHotspots />
        <AddHotspotBanner />
      </div>
      <Footer />
    </main>
  );
}
