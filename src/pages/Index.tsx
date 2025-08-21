
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, Shield, Users, Building, Heart, Phone, MessageCircle, Award, Gavel, Briefcase, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DownloadsSection from "@/components/DownloadsSection";
import PartnersSection from "@/components/PartnersSection";

const Index = () => {
  // Legal services data with improved structure
  const legalServices = [
    {
      icon: Gavel,
      title: "Commercial Litigation",
      description: "Expert representation in commercial disputes, contract breaches, and business litigation matters",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: FileText,
      title: "Contract Drafting & Negotiation", 
      description: "Professional contract drafting, review, and negotiation services for businesses and individuals",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Shield,
      title: "Dispute Resolution",
      description: "Alternative dispute resolution including mediation, arbitration, and conflict resolution",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Heart,
      title: "Family Law",
      description: "Child custody, maintenance, adoption, and comprehensive family legal support",
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: Users,
      title: "Sports Law",
      description: "Legal representation for athletes, sports organizations, and sports-related contractual matters",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: FileText,
      title: "Legal Research",
      description: "Comprehensive legal research services for complex legal matters and case preparation",
      color: "text-indigo-600 dark:text-indigo-400"
    },
    {
      icon: Brain,
      title: "Mental Health Law",
      description: "Psychology-informed legal support with specialized understanding of mental health matters",
      color: "text-pink-600 dark:text-pink-400"
    }
  ];

  // Core values data for better organization
  const brandValues = [
    { 
      icon: Scale, 
      title: "Integrity", 
      description: "Unwavering commitment to ethical practice and honest representation",
      color: "text-blue-600 dark:text-blue-400"
    },
    { 
      icon: Shield, 
      title: "Service Delivery", 
      description: "Timely and professional legal services with meticulous attention to detail",
      color: "text-green-600 dark:text-green-400"
    },
    { 
      icon: FileText, 
      title: "Cost-Friendliness", 
      description: "Affordable legal services without compromising on quality",
      color: "text-purple-600 dark:text-purple-400"
    },
    { 
      icon: Users, 
      title: "Accessibility", 
      description: "Legal services accessible to all members of the community",
      color: "text-orange-600 dark:text-orange-400"
    },
    { 
      icon: Gavel, 
      title: "Justice", 
      description: "Dedicated commitment to achieving fair and just outcomes",
      color: "text-red-600 dark:text-red-400"
    }
  ];

  // Awards and recognitions with enhanced interactivity
  const awards = [
    {
      year: "2025",
      title: "International Representative",
      description: "Represented Kenya at Open Dialogue Conference, Moscow",
      icon: Award,
      color: "from-yellow-400 to-orange-500"
    },
    {
      year: "2024",
      title: "Young Male Lawyer of the Year",
      description: "Paralegal Society of Kenya & Kituo Cha Sheria",
      icon: Award,
      color: "from-blue-400 to-purple-500"
    },
    {
      year: "2024",
      title: "Legal Columnist",
      description: "Kenya Times Columnist",
      icon: FileText,
      color: "from-green-400 to-blue-500"
    },
    {
      year: "2024",
      title: "Vice Secretary",
      description: "LSK Thika Chapter",
      icon: Users,
      color: "from-red-400 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Company Slogan */}
      <section className="relative bg-gradient-to-r from-blue-900/90 to-blue-700/90 dark:from-blue-950/95 dark:to-blue-800/95 text-white py-12 sm:py-16 lg:py-20 min-h-[80vh] flex items-center overflow-hidden">
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
                <span className="text-yellow-400 font-extrabold">Mwaura Muroki</span><br />
                <span className="text-2xl sm:text-3xl lg:text-4xl">Associates & Advocates</span>
              </h1>
              
              {/* Company Slogan */}
              <div className="bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-4 mb-6">
                <p className="text-xl sm:text-2xl font-bold text-yellow-300 mb-2">
                  "To provide Timely and Affordable Legal Services"
                </p>
                <p className="text-sm sm:text-base text-blue-100">
                  Professional legal representation with integrity, expertise, and dedication to justice in Thika, Kenya
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
                <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-yellow-400">
                  <Link to="/contact">Book a Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm">
                  <a href="tel:+254704780934">Call Now: +254 704 780 934</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm">
                  <Link to="/contact">Send Us a Message</Link>
                </Button>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex justify-center lg:justify-start gap-4 sm:gap-6">
                <a 
                  href="tel:+254704780934" 
                  className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50 hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 transform hover:scale-110 hover:animate-bounce shadow-lg"
                  aria-label="Call us"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-black transition-colors duration-300" />
                </a>
                <a 
                  href="https://wa.me/254704780934" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50 hover:bg-green-500 hover:border-green-500 transition-all duration-300 transform hover:scale-110 hover:animate-bounce shadow-lg"
                  aria-label="WhatsApp us"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-white transition-colors duration-300" />
                </a>
                <a 
                  href="mailto:mwauramurokiadvocates@gmail.com"
                  className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50 hover:bg-red-500 hover:border-red-500 transition-all duration-300 transform hover:scale-110 hover:animate-bounce shadow-lg"
                  aria-label="Email us"
                >
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </motion.div>
            
            {/* Right Column - Lawyer Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-blue-400/30 rounded-full blur-2xl animate-pulse"></div>
                
                {/* Main image container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl backdrop-blur-sm bg-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Francis Mwaura Muroki - Principal Advocate"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay gradient for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating elements around the image */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-white rounded-full animate-pulse opacity-50"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Values Featured Quote Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Core Values</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Guided by principles of <strong>Integrity, Service Delivery, Cost-Friendliness, Accessibility, and Justice</strong>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
            {brandValues.map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <value.icon className={`w-12 h-12 sm:w-16 sm:h-16 ${value.color} mx-auto mb-4 transition-transform duration-300 hover:scale-110`} />
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Overview Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
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
                <Card className="h-full hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-400/50">
                  <CardHeader className="pb-4">
                    <service.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${service.color} mb-4 group-hover:scale-110 transition-all duration-300`} />
                    <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4">
                      {service.description}
                    </CardDescription>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                        <Link to="/services">More Info</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex-1">
                        <Link to="/contact">Book Consultation</Link>
                      </Button>
                    </div>
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

      {/* Enhanced Awards and Recognition Section with Hover Effects */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Awards & Recognition</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Celebrating excellence in legal practice and professional achievements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white dark:bg-gray-700 relative overflow-hidden">
                  {/* Animated gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${award.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                  <div className={`absolute inset-[1px] bg-gradient-to-r ${award.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative bg-white dark:bg-gray-700 m-[1px] rounded-lg">
                    <CardHeader className="pb-4">
                      <award.icon className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">{award.year}</div>
                      <CardTitle className="text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{award.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 text-sm group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {award.description}
                      </CardDescription>
                    </CardHeader>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Downloads Section */}
      <DownloadsSection />

      {/* Enhanced Contact CTA Section */}
      <section className="py-12 sm:py-16 bg-blue-900 dark:bg-blue-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Legal Help?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact us today for a consultation and let us help you navigate your legal challenges
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black border-2 border-yellow-400 font-bold shadow-lg">
              <Link to="/contact">Book Consultation</Link>
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-white/10 font-bold shadow-lg">
                <a href="tel:+254704780934" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Now
                </a>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-white/10 font-bold shadow-lg">
                <Link to="/contact" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Send Message
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
