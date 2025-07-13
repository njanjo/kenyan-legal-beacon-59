
import { Link } from "react-router-dom";
import { Scale, Phone, Mail, MapPin, MessageCircle, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="w-8 h-8 text-yellow-400" />
              <span className="font-bold text-xl">Mwaura Muroki Associates & Advocates</span>
            </div>
            <p className="text-blue-100 mb-4">
              "To provide Timely and Affordable Legal Services" - Professional legal services in Thika, Kenya with integrity, expertise, and dedication to justice.
            </p>
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
                <a href="tel:0796985336" className="text-blue-100 hover:text-white transition-colors">
                  0796985336
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-yellow-400" />
                <a 
                  href="https://wa.me/254796985336" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <a href="mailto:drfatush005@gmail.com" className="text-blue-100 hover:text-white transition-colors">
                  drfatush005@gmail.com
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span className="text-blue-100">Thika, Kenya</span>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
