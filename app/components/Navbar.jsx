"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close mobile menu when navigating
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Explore", href: "/explore" },
        { label: "Add Hotspot", href: "/add-hotspot" },
        { label: "About", href: "/about" },
    ];

    const isActive = (path) => pathname === path;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white shadow-md py-2"
                    : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-blue-600">Crowd</span>
                        <span className="text-2xl font-bold text-gray-800">Gem</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`font-medium transition-colors duration-200 ${isActive(item.href)
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-blue-600"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Actions - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden ${isOpen
                            ? "max-h-screen opacity-100 visible"
                            : "max-h-0 opacity-0 invisible"
                        } transition-all duration-300 overflow-hidden`}
                >
                    <div className="flex flex-col mt-4 space-y-4 pb-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`font-medium px-2 py-1 ${isActive(item.href)
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-blue-600"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="border-t border-gray-200 pt-4 mt-2 space-y-4">
                            <Link
                                href="/login"
                                className="block text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium text-center"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}