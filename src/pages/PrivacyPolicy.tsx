
import { Scale, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEO, { SITE_URL } from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-navy-100 dark:from-navy-950 dark:to-navy-950">
      <SEO
        title="Privacy Policy | Mwaura Muroki Associates"
        description="Privacy policy for Mwaura Muroki Associates & Advocates under Kenya's Data Protection Act 2019."
        canonical={`${SITE_URL}/privacy-policy`}
        noindex
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-navy-900 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Scale className="w-8 h-8 text-navy-700" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Privacy Policy
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
              Mwaura Muroki Associates & Advocates - Effective Date: 1 October 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-navy-900 rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Compliance with Kenyan Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Mwaura Muroki Associates & Advocates is committed to protecting your privacy in accordance with Kenya's Data Protection Act (2019) and the Law Society of Kenya (LSK) guidelines. This Privacy Policy explains how we collect, use, store, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Personal Information:</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Full name and contact details (phone number, email address)</li>
                    <li>Physical address and location information</li>
                    <li>Legal inquiry details and case information</li>
                    <li>Communication preferences and appointment details</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Technical Information:</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    <li>IP address and browser information</li>
                    <li>Website usage data and analytics</li>
                    <li>Cookies and tracking technologies</li>
                    <li>Device information and access logs</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Providing legal consultation and services</li>
                <li>Scheduling and managing appointments</li>
                <li>Following up on legal inquiries and case updates</li>
                <li>Sending relevant legal information and firm updates</li>
                <li>Improving our website and service delivery</li>
                <li>Complying with legal and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Data Storage and Protection
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We implement robust security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure servers with restricted access controls</li>
                  <li>Regular security audits and updates</li>
                  <li>Staff training on data protection protocols</li>
                  <li>Compliance with attorney-client privilege requirements</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Third-Party Integrations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We may use third-party services for enhanced functionality:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>WhatsApp Business:</strong> For direct communication and appointment scheduling</li>
                <li><strong>Email Services:</strong> For secure communication and case updates</li>
                <li><strong>Analytics Tools:</strong> To improve website performance and user experience</li>
                <li><strong>Appointment Systems:</strong> For scheduling and calendar management</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                We do not sell, rent, or share your personal information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Your Rights Under Kenyan Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Under Kenya's Data Protection Act (2019), you have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Access your personal data we hold</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Data portability where technically feasible</li>
                <li>Lodge a complaint with the Data Protection Commissioner</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Contact Information for Privacy Inquiries
              </h2>
              <div className="bg-navy-50 dark:bg-navy-800/40 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  For any privacy-related inquiries or to exercise your rights:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Data Protection Officer:</strong> Mwaura Francis Muroki</p>
                  <p><strong>Email:</strong> mwauramurokiadvocates@gmail.com</p>
                  <p><strong>Phone:</strong> +254 704 780 934</p>
                  <p><strong>Address:</strong> Thika, Kenya</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Updates to This Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes through our website or direct communication. Your continued use of our services after such updates constitutes acceptance of the revised policy.
              </p>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: October 2026 | Mwaura Muroki Associates & Advocates | Licensed Advocate of the High Court of Kenya
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
