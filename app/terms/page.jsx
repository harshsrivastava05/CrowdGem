import Footer from "../components/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">⚖️ Terms of Service</h1>

                        <div className="prose prose-blue max-w-none">
                            <p className="text-lg mb-6">
                                By using <strong>CrowdGem</strong>, you agree to the following terms and conditions:
                            </p>

                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">1. User Content</h3>
                                    <p>
                                        You are responsible for the content you submit. Do not upload false, harmful,
                                        or copyrighted material.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Content Moderation</h3>
                                    <p>
                                        CrowdGem may moderate or remove content that violates community standards or laws.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Intellectual Property</h3>
                                    <p>
                                        You retain ownership of your contributions but grant us a license to display and
                                        use them to improve the platform.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Account Suspension</h3>
                                    <p>
                                        We reserve the right to suspend accounts that abuse the system or violate terms.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-lg mt-8">
                                <p className="font-medium">
                                    Use of CrowdGem implies acceptance of these terms.
                                </p>
                            </div>

                            <p className="text-sm text-gray-500 mt-8">
                                Last updated: April 29, 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}