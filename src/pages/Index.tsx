import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, Shield, Users, Building, Heart, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DownloadsSection from "@/components/DownloadsSection";
import AIChatbot from "@/components/AIChatbot";
import PartnersSection from "@/components/PartnersSection";

const Index = () => {
  // Legal services data with improved structure
  const legalServices = [
    {
      icon: Heart,
      title: "Family Law",
      description: "Divorce proceedings, child custody, matrimonial disputes, and family mediation",
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: Shield,
      title: "Criminal Law", 
      description: "Criminal defense, bail applications, and representation in criminal proceedings",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Building,
      title: "Property & Conveyancing",
      description: "Property transfers, conveyancing, land disputes, and real estate transactions",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Users,
      title: "Employment Law",
      description: "Labour disputes, employment contracts, wrongful termination, and workplace rights",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Building,
      title: "Business & Commercial Law",
      description: "Company formation, commercial contracts, business disputes, and compliance",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: FileText,
      title: "Wills & Estate Planning",
      description: "Will drafting, probate matters, estate administration, and succession planning",
      color: "text-indigo-600 dark:text-indigo-400"
    }
  ];

  // Core values data for better organization
  const coreValues = [
    { 
      icon: Scale, 
      title: "Integrity", 
      description: "Unwavering commitment to ethical practice and honest representation",
      color: "text-blue-600 dark:text-blue-400"
    },
    { 
      icon: Shield, 
      title: "Professionalism", 
      description: "Highest standards of legal practice with meticulous attention to detail",
      color: "text-green-600 dark:text-green-400"
    },
    { 
      icon: FileText, 
      title: "Confidentiality", 
      description: "Complete client confidentiality and discretion in all legal matters",
      color: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Global Transparent Blurred Background Overlay */}
      <div className="fixed inset-0 z-0 bg-white/30 dark:bg-black/20 backdrop-blur-sm pointer-events-none" />
      
      {/* Hero Section with Enhanced Background and Owner Image */}
      <section className="relative bg-gradient-to-r from-blue-900/90 to-blue-700/90 dark:from-blue-950/95 dark:to-blue-800/95 text-white py-12 sm:py-16 lg:py-20 min-h-[80vh] flex items-center overflow-hidden z-10">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-700/85 dark:from-blue-950/90 dark:to-blue-800/90" />
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <Scale className="w-12 h-12 sm:w-16 sm:h-16 mx-auto lg:mx-0 mb-4 sm:mb-6 text-yellow-400 animate-pulse" />
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
                Trusted Legal Counsel in{" "}
                <span className="text-yellow-400 font-extrabold">Kenya</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-xl mb-6 sm:mb-8 leading-relaxed font-medium">
                Professional legal representation with integrity, expertise, and dedication to justice
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
                <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-yellow-400">
                  <Link to="/contact">Book a Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm">
                  <a href="tel:0796985336">Call Now: 0796985336</a>
                </Button>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex justify-center lg:justify-start gap-4 sm:gap-6">
                <a 
                  href="tel:0796985336" 
                  className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50 hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 transform hover:scale-110 hover:animate-bounce shadow-lg"
                  aria-label="Call us"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-black transition-colors duration-300" />
                </a>
                <a 
                  href="https://wa.me/254796985336" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50 hover:bg-green-500 hover:border-green-500 transition-all duration-300 transform hover:scale-110 hover:animate-bounce shadow-lg"
                  aria-label="WhatsApp us"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-white transition-colors duration-300" />
                </a>
                <a 
                  href="mailto:drfatush005@gmail.com"
                  className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50 hover:bg-red-500 hover:border-red-500 transition-all duration-300 transform hover:scale-110 hover:animate-bounce shadow-lg"
                  aria-label="Email us"
                >
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </motion.div>
            
            {/* Right Column - Owner Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-blue-400/30 rounded-full blur-2xl animate-pulse-glow"></div>
                
                {/* Main image container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl backdrop-blur-sm bg-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1594736797933-d0c6d7a2a5be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Professional Legal Assistant - Smiling lady helping client"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay gradient for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating elements around the image */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce-subtle opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-float opacity-60"></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-white rounded-full animate-pulse opacity-50"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Overview Section with Better Light Mode */}
      <section className="py-12 sm:py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Legal Services</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive legal solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-hidden">
            {legalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-400/50">
                  <CardHeader className="pb-4">
                    <service.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${service.color} mb-4 group-hover:scale-110 transition-all duration-300`} />
                    <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-500 shadow-lg">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <div className="relative z-10">
        <PartnersSection />
      </div>

      {/* Downloads Section */}
      <div className="relative z-10">
        <DownloadsSection />
      </div>

      {/* Enhanced Why Choose Us Section with Better Light Mode */}
      <section className="py-12 sm:py-16 bg-gray-100/80 dark:bg-muted/20 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Our Legal Services</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {coreValues.map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <item.icon className={`w-12 h-12 sm:w-16 sm:h-16 ${item.color} mx-auto mb-4 transition-transform duration-300 hover:scale-110`} />
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact CTA Section with Better Light Mode */}
      <section className="py-12 sm:py-16 bg-blue-900/90 dark:bg-blue-950/90 backdrop-blur-sm text-white relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Legal Help?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact us today for a consultation and let us help you navigate your legal challenges
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black border-2 border-yellow-400 font-bold shadow-lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-white/10 backdrop-blur-sm font-bold shadow-lg">
                <a href="tel:0796985336" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  0796985336
                </a>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-white/10 backdrop-blur-sm font-bold shadow-lg">
                <a href="https://wa.me/254796985336" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced AI Chatbot Assistant */}
      <div className="relative z-20">
        <AIChatbot />
      </div>
    </div>
  );
};

export default Index;
