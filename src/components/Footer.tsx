
import { Link } from "react-router-dom";
import { Scale, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="w-8 h-8 text-yellow-400" />
              <span className="font-bold text-xl">Legal Counsel</span>
            </div>
            <p className="text-blue-100 mb-4">
              Professional legal services in Kenya with integrity, expertise, and dedication to justice.
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
              <li>Family Law</li>
              <li>Criminal Law</li>
              <li>Property & Conveyancing</li>
              <li>Employment Law</li>
              <li>Business Law</li>
              <li>Estate Planning</li>
            </ul>
          </div>

          {/* Contact Info */}
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
                <span className="text-blue-100">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Legal Counsel Kenya. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Licensed Advocate of the High Court of Kenya | Member of Law Society of Kenya (LSK)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
