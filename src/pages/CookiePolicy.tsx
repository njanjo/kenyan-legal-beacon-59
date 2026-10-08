
import { ArrowLeft, Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import SEO, { SITE_URL } from "@/components/SEO";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-navy-100 dark:from-navy-950 dark:to-navy-950">
      <SEO
        title="Cookie Policy | Mwaura Muroki Associates"
        description="Cookie policy for Mwaura Muroki Associates & Advocates website."
        canonical={`${SITE_URL}/cookie-policy`}
        noindex
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-navy-900 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Cookie className="w-8 h-8 text-navy-700" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Cookie Policy
                </h1>
              </div>
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-navy-700 hover:text-navy-900 dark:text-gold-400 dark:hover:text-gold-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              How we use cookies and similar technologies
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-navy-900 rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They help websites remember information about your visit, making it easier to visit the site again and making the site more useful to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Types of Cookies We Use
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gold-500 pl-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Necessary Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies are essential for the website to function properly and cannot be switched off.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1">
                    <li>Cookie consent preferences</li>
                    <li>Security and authentication</li>
                    <li>Basic website functionality</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gold-500 pl-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Functional Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies enhance functionality and personalization but are not essential.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1">
                    <li>Language preferences</li>
                    <li>Theme settings (dark/light mode)</li>
                    <li>Form data retention</li>
                    <li>Chat widget preferences</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gold-500 pl-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Analytics Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1">
                    <li>Google Analytics (page views, session duration)</li>
                    <li>User behavior tracking</li>
                    <li>Performance monitoring</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Cookie Duration
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead className="bg-navy-50 dark:bg-navy-800">
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">Cookie Type</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">Duration</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">Session Cookies</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">Until browser closes</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">Basic functionality</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">Persistent Cookies</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">1-24 months</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">Preferences & analytics</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">Third-party Cookies</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">Varies</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">Analytics & functionality</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Managing Your Cookie Preferences
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You have several options for managing cookies:
                </p>
                
                <div className="bg-navy-50 dark:bg-navy-800/40 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-navy-700 dark:text-gold-300 mb-3">
                    Website Cookie Settings
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">
                    Use our cookie consent banner to manage your preferences:
                  </p>
                  <div className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                    <p>• <strong>Accept All:</strong> Allow all cookies</p>
                    <p>• <strong>Reject Non-Essential:</strong> Only necessary cookies</p>
                    <p>• <strong>Customize:</strong> Choose specific cookie types</p>
                  </div>
                </div>

                <div className="bg-navy-50 dark:bg-navy-800/40 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Browser Settings
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    You can also control cookies through your browser settings:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Block all cookies</li>
                    <li>Delete existing cookies</li>
                    <li>Set notifications when cookies are sent</li>
                    <li>Manage third-party cookies separately</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We may use third-party services that set their own cookies:
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Google Analytics</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Helps us understand website usage and improve user experience.
                  </p>
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-700 hover:text-navy-900 dark:text-gold-400 dark:hover:text-gold-300 text-sm"
                  >
                    Google Privacy Policy →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Chat Widgets</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    May store preferences for chat functionality and user sessions.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Your Rights and Choices
              </h2>
              <div className="bg-navy-50 dark:bg-navy-800/40 p-6 rounded-lg">
                <p className="text-navy-700 dark:text-gold-300 leading-relaxed mb-4">
                  Under Kenyan data protection laws, you have the right to:
                </p>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Know what cookies are being used</li>
                  <li>Withdraw consent at any time</li>
                  <li>Access information about cookie usage</li>
                  <li>Request deletion of non-essential cookies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Updates to This Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of significant changes by posting the updated policy on our website with a new effective date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Contact Us
              </h2>
              <div className="bg-navy-50 dark:bg-navy-800/40 p-6 rounded-lg">
                <p className="text-navy-700 dark:text-gold-300 mb-4">
                  For questions about our use of cookies:
                </p>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><strong>Email:</strong> mwauramurokiadvocates@gmail.com</p>
                  <p><strong>Phone:</strong> +254 704 780 934</p>
                  <p><strong>Address:</strong> Thika, Kenya</p>
                </div>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: October 2026 | This policy explains our use of cookies and similar technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
