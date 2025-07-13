
import { Scale, ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Scale className="w-8 h-8 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Terms & Conditions
                </h1>
              </div>
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Terms of Use for Mwaura Muroki Associates & Advocates Website
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing and using this website operated by Mwaura Muroki Associates & Advocates, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Intellectual Property Rights
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Mwaura Muroki Associates & Advocates and is protected by Kenyan and international copyright laws.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border-l-4 border-amber-500">
                  <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200 mb-2">
                    Prohibited Activities:
                  </h3>
                  <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 space-y-1">
                    <li>Copying, reproducing, or distributing website content without permission</li>
                    <li>Using content for commercial purposes without authorization</li>
                    <li>Modifying or creating derivative works from our materials</li>
                    <li>Reverse engineering or attempting to extract source code</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Acceptable Use Policy
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the website.
                </p>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Prohibited Uses:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Transmitting spam, chain letters, or unsolicited communications</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Using automated tools to scrape or harvest content</li>
                  <li>Posting or transmitting malicious code or viruses</li>
                  <li>Impersonating others or providing false information</li>
                  <li>Violating any applicable local, national, or international laws</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Downloadable Content and Legal Materials
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may provide downloadable legal forms, templates, and educational materials. By downloading these materials, you agree to the following terms:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Materials are for personal or legitimate business use only</li>
                  <li>Commercial redistribution or resale is strictly prohibited</li>
                  <li>You acknowledge that forms may require legal review before use</li>
                  <li>We are not responsible for the outcome of using downloaded materials</li>
                  <li>Materials are provided "as is" without warranty of any kind</li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <FileText className="w-4 h-4 inline mr-2" />
                    <strong>Important:</strong> Legal forms and templates should be reviewed by qualified legal counsel before use. Generic forms may not be suitable for all situations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Communication Tools and Services
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our website provides various communication tools including contact forms, WhatsApp integration, and appointment booking systems. Please note:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Use of these tools does not create an attorney-client relationship</li>
                  <li>Communications may not be confidential until formal representation begins</li>
                  <li>We reserve the right to terminate access to communication tools</li>
                  <li>Response times are not guaranteed through website communications</li>
                  <li>Technical issues may affect message delivery</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms and Conditions by reference. By using this website, you consent to the collection and use of information as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Disclaimers and Limitations
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  This website and its content are provided on an "as is" basis without any representations or warranties, express or implied. We do not warrant that:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>The website will be continuously available or error-free</li>
                  <li>Information is accurate, complete, or current</li>
                  <li>The website is free from viruses or harmful components</li>
                  <li>Communication through the website is secure or confidential</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Governing Law and Jurisdiction
              </h2>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <p className="text-green-800 dark:text-green-200 leading-relaxed">
                  These Terms and Conditions are governed by and construed in accordance with the laws of Kenya. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the Kenyan courts. Mwaura Muroki Associates & Advocates operates under the regulations and ethical guidelines of the Law Society of Kenya (LSK).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Modification of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated revision date. Your continued use of the website after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Contact Information
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  For questions about these Terms and Conditions, please contact:
                </p>
                <div className="space-y-2 text-blue-700 dark:text-blue-300">
                  <p><strong>Mwaura Muroki Associates & Advocates</strong></p>
                  <p><strong>Email:</strong> mwauramurokiadvocates@gmail.com</p>
                  <p><strong>Phone:</strong> +254 704 780 934</p>
                  <p><strong>Location:</strong> Thika, Kenya</p>
                </div>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString()} | These terms are effective immediately and govern your use of this website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
