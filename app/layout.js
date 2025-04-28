import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "CrowdGem | Discover Hidden Gems",
  description: "CrowdGem helps you discover and share hidden hotspots in your city with a community of explorers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}