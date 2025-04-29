import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "CrowdGem | Discover Hidden Gems",
  description:
    "CrowdGem helps you discover and share hidden hotspots in your city with a community of explorers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Navbar />
          <div className="pt-20">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
