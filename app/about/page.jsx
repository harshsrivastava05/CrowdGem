import Footer from "../components/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">📘 About Us</h1>

                        <div className="prose prose-blue max-w-none">
                            <p className="text-lg mb-6">
                                <strong>CrowdGem</strong> is a collaborative platform where users contribute and harness the power of
                                crowdsourced data. Whether it's gathering insights, solving real-world problems, or building
                                data-driven tools, CrowdGem provides a seamless interface to collect, visualize, and act on
                                information—together.
                            </p>

                            <p className="text-lg">
                                We believe in the power of community, transparency, and intelligent collaboration to create a
                                smarter future.
                            </p>

                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Community</h3>
                                    <p>We're powered by our users who share their favorite local discoveries with others.</p>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Transparency</h3>
                                    <p>Real people sharing real experiences, with honest ratings and reviews.</p>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Collaboration</h3>
                                    <p>Together, we create a comprehensive guide to hidden gems around the world.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}