"use client";

import { useState } from "react";
import Footer from "../components/Footer";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call with timeout
        setTimeout(() => {
            // In a real application, you would send this data to your API
            console.log("Form data:", formData);
            setSubmitStatus("success");
            setIsSubmitting(false);

            // Reset form after successful submission
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

            // Reset status after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">📩 Contact Us</h1>

                        <div className="prose prose-blue max-w-none mb-8">
                            <p className="text-lg mb-6">
                                Have questions, feedback, or partnership inquiries? We'd love to hear from you!
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
                                    <span className="text-2xl mb-2">📧</span>
                                    <h3 className="font-semibold text-gray-800">Email</h3>
                                    <a href="mailto:support@crowdgem.io" className="text-blue-600 hover:underline">
                                        support@crowdgem.io
                                    </a>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
                                    <span className="text-2xl mb-2">🌐</span>
                                    <h3 className="font-semibold text-gray-800">Website</h3>
                                    <a href="https://www.crowdgem.io" className="text-blue-600 hover:underline">
                                        www.crowdgem.io
                                    </a>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
                                    <span className="text-2xl mb-2">📍</span>
                                    <h3 className="font-semibold text-gray-800">Location</h3>
                                    <p>Remote-first, globally connected</p>
                                </div>
                            </div>

                            <p>
                                We aim to respond within 24–48 hours.
                            </p>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>

                            {submitStatus === "success" && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                                    Your message has been sent! We'll get back to you soon.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}