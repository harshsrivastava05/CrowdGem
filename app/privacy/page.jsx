import Footer from "../components/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">🔐 Privacy Policy</h1>

                        <div className="prose prose-blue max-w-none">
                            <p className="text-lg mb-6">
                                At <strong>CrowdGem</strong>, your privacy is our priority. We only collect data necessary
                                to improve our services and provide personalized user experiences.
                            </p>

                            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6">
                                <p className="font-medium">
                                    We do <strong>not</strong> sell or share your personal information with third parties without consent.
                                </p>
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Data Collection & Usage</h2>
                            <p className="mb-4">
                                Data collected (such as email, usage stats, or contributions) is stored securely and used
                                solely to enhance your experience on the platform.
                            </p>

                            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Your Rights</h2>
                            <p className="mb-6">
                                You can review, update, or delete your data anytime through your account settings.
                            </p>

                            <div className="bg-blue-50 p-6 rounded-lg mt-8">
                                <h3 className="text-xl font-semibold text-blue-700 mb-3">Contact Us About Privacy</h3>
                                <p>
                                    For any concerns about your privacy or data, please contact us at{" "}
                                    <a href="mailto:privacy@crowdgem.io" className="text-blue-600 hover:underline">privacy@crowdgem.io</a>.
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