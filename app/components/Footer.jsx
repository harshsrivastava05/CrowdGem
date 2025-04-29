import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p className="mb-4">© 2025 Hidden Gems. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
          <Link href="/terms" className="hover:text-blue-600">Terms</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </div>
    </footer>
  );
}