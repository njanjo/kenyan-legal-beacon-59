
import { Link } from "react-router-dom";
import { Scale, Phone, Mail, MapPin, MessageCircle, Youtube, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/uploads/7ac751ff-dfac-4f6b-9e97-e9e8eb7fe3b8.png"
                alt="Mwaura Muroki Associates Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-bold text-xl leading-tight">Mwaura Muroki</span>
            </div>
            <p className="text-blue-100 mb-3">
              Associates & Advocates. "To provide Timely and Affordable Legal Services" - Professional legal services in Thika, Kenya with integrity, expertise, and dedication to justice.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-blue-200">
              <Scale className="w-4 h-4 text-gold-400" />
              Licensed Advocate · High Court of Kenya
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-blue-100 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal Services</h3>
            <ul className="space-y-2 text-blue-100">
              <li>Commercial Litigation</li>
              <li>Contract Drafting & Negotiation</li>
              <li>Dispute Resolution</li>
              <li>Family Law (Custody, Maintenance, Adoption)</li>
              <li>Sports Law</li>
              <li>Legal Research</li>
              <li>Mental Health Law</li>
            </ul>
          </div>

          {/* Contact Info & Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <a href="tel:+254704780934" className="text-blue-100 hover:text-white transition-colors">
                  +254 704 780 934
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-yellow-400" />
                <a 
                  href="https://wa.me/254704780934" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <div className="flex flex-col">
                  <a href="mailto:mwauramurokiadvocates@gmail.com" className="text-blue-100 hover:text-white transition-colors text-sm">
                    mwauramurokiadvocates@gmail.com
                  </a>
                  <a href="mailto:mwaurafmuroki@yahoo.com" className="text-blue-100 hover:text-white transition-colors text-sm">
                    mwaurafmuroki@yahoo.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span className="text-blue-100">Thika, Kenya</span>
              </div>

              {/* Social Media Links */}
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2 text-yellow-400">Follow Us</h4>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://facebook.com/francis.muroki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>
                  <a 
                    href="https://instagram.com/IamMwauraMuroki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/mwaura-muroki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://twitter.com/Iammwauramuroki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>

              {/* YouTube Links */}
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2 text-yellow-400">Watch Our Videos</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <a 
                      href="https://youtu.be/NafQG2JUlhQ?si=fs97AKYtJOesBzhU" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-100 hover:text-white transition-colors text-sm"
                    >
                      Legal Insights Video 1
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <a 
                      href="https://youtu.be/S8aDORAlyr4?si=j0lekfW_rSGkjfU6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-100 hover:text-white transition-colors text-sm"
                    >
                      Legal Insights Video 2
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Mwaura Muroki Associates & Advocates. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Licensed Advocate of the High Court of Kenya | Member of Law Society of Kenya (LSK)
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/privacy-policy" className="text-blue-100 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="text-blue-100 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/legal-disclaimer" className="text-blue-100 hover:text-white transition-colors">
              Legal Disclaimer
            </Link>
            <Link to="/cookie-policy" className="text-blue-100 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
          <div className="mt-4 text-xs text-blue-200">
            <p className="italic">
              "The information on this website is for informational purposes only and should not be relied upon as legal advice. 
              We are not liable for any harm or injury resulting from reliance on the information herein."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
