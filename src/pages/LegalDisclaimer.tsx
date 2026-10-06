
import { Scale, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const LegalDisclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-navy-100 dark:from-navy-950 dark:to-navy-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-navy-900 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Scale className="w-8 h-8 text-navy-700" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Legal Disclaimer
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
              Important Legal Notice - Please Read Carefully
            </p>
          </div>

          {/* Main Disclaimer */}
          <div className="bg-white dark:bg-navy-900 rounded-lg shadow-lg p-8 mb-6">
            <div className="flex items-start space-x-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-gold-500 flex-shrink-0 mt-1" />
              <div className="bg-slate-50 dark:bg-navy-800/40 p-6 rounded-lg border-l-4 border-gold-500">
                <h2 className="text-xl font-bold text-gold-700 dark:text-gold-400 mb-4">
                  Important Legal Notice
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                  The content provided on this website is for general informational purposes only and does not constitute legal advice. Viewing or using this site does not create an advocate-client relationship. Mwaura Muroki Associates & Advocates is not liable for any actions taken based on the content herein. For personalized legal guidance, please contact the firm directly.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Disclaimers */}
          <div className="bg-white dark:bg-navy-900 rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1. No Attorney-Client Relationship
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Use of this website, including sending messages through contact forms, WhatsApp, or any other communication method, does not create an attorney-client relationship between you and Mwaura Muroki Associates & Advocates. An attorney-client relationship is established only through a formal written agreement signed by both parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                2. General Information Only
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                All content on this website, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Legal articles and blog posts</li>
                <li>Service descriptions and practice area information</li>
                <li>Downloadable forms and templates</li>
                <li>Frequently asked questions and answers</li>
                <li>Case studies and examples</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                is provided for general informational and educational purposes only and should not be relied upon as legal advice for any specific situation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3. No Legal Advice
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The information provided on this website does not constitute legal advice and is not intended as a substitute for consultation with qualified legal counsel. Laws change frequently, and legal advice must be tailored to the specific circumstances of each case. You should not act or rely on any information on this website without seeking the advice of qualified legal counsel licensed in Kenya.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Mwaura Muroki Associates & Advocates, its partners, employees, and agents shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Any direct, indirect, incidental, consequential, or punitive damages</li>
                <li>Any loss of profits, revenue, data, or use</li>
                <li>Any damage caused by reliance on information from this website</li>
                <li>Any actions taken or not taken based on website content</li>
                <li>Any technical issues, errors, or omissions on the website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Confidentiality Notice
              </h2>
              <div className="bg-slate-50 dark:bg-navy-800/40 p-6 rounded-lg border-l-4 border-gold-500">
                <p className="text-gold-700 dark:text-gold-400 font-medium mb-2">
                  Important: Do Not Send Confidential Information
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Please do not send confidential or sensitive information through this website, email, or any unsecured communication method until an attorney-client relationship has been established. Any information sent before such relationship is established may not be protected by attorney-client privilege.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Jurisdiction and Governing Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This disclaimer and all matters relating to your use of this website shall be governed by the laws of Kenya. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of Kenya. Mwaura Muroki Associates & Advocates is licensed to practice law in Kenya and provides legal services in accordance with the Laws of Kenya and the Law Society of Kenya regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Professional Standards
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Mwaura Muroki Associates & Advocates is committed to maintaining the highest professional and ethical standards as required by the Law Society of Kenya (LSK). This website and all communications are conducted in accordance with LSK rules and regulations governing legal practice in Kenya.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Contact for Legal Services
              </h2>
              <div className="bg-navy-50 dark:bg-navy-800/40 p-6 rounded-lg">
                <p className="text-navy-700 dark:text-gold-300 font-medium mb-4">
                  For Professional Legal Consultation:
                </p>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><strong>Phone:</strong> +254 704 780 934</p>
                  <p><strong>Email:</strong> mwauramurokiadvocates@gmail.com</p>
                  <p><strong>WhatsApp:</strong> +254 704 780 934</p>
                  <p><strong>Location:</strong> Thika, Kenya</p>
                </div>
                <p className="text-navy-700 dark:text-gold-300 text-sm mt-4">
                  Licensed Advocate of the High Court of Kenya | Member of Law Society of Kenya (LSK)
                </p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This disclaimer was last updated on 1 October 2026 and may be updated periodically. 
                Please review regularly for any changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDisclaimer;
