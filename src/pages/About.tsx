
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Award, BookOpen, Users, Briefcase, MapPin, Calendar, Mail, Phone, MessageCircle, Gavel, FileText, Shield, Heart, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const specializations = [
    { icon: Gavel, name: "Commercial Litigation", color: "bg-blue-100 text-blue-800" },
    { icon: FileText, name: "Contract Law", color: "bg-green-100 text-green-800" },
    { icon: Shield, name: "Dispute Resolution", color: "bg-purple-100 text-purple-800" },
    { icon: Heart, name: "Family Law", color: "bg-red-100 text-red-800" },
    { icon: Users, name: "Sports Law", color: "bg-orange-100 text-orange-800" },
    { icon: Brain, name: "Mental Health Law", color: "bg-pink-100 text-pink-800" }
  ];

  const timeline = [
    {
      year: "2025",
      title: "International Representative",
      description: "Represented Kenya at Open Dialogue Conference, Moscow",
      type: "achievement"
    },
    {
      year: "2024",
      title: "Young Male Lawyer of the Year",
      description: "Awarded by Paralegal Society of Kenya & Kituo Cha Sheria",
      type: "award"
    },
    {
      year: "2024",
      title: "Vice Secretary, LSK Thika Chapter",
      description: "Elected to leadership position in Law Society of Kenya",
      type: "position"
    },
    {
      year: "2024",
      title: "Legal Columnist",
      description: "Regular columnist for Kenya Times newspaper",
      type: "media"
    },
    {
      year: "2022-2024",
      title: "Thika Representative",
      description: "LSK Thika Chapter Representative",
      type: "position"
    },
    {
      year: "2022",
      title: "Firm Establishment",
      description: "Founded Mwaura Muroki Associates & Advocates in Thika, Kenya",
      type: "milestone"
    },
    {
      year: "2020-2025",
      title: "Licensed Advocate",
      description: "Licensed by Law Society of Kenya - High Court of Kenya",
      type: "credential"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold mb-6">Attorney Profile</h1>
              <h2 className="text-3xl font-semibold mb-4 text-yellow-300">Francis Mwaura Muroki</h2>
              <p className="text-xl mb-6">
                Principal Advocate & Founder
              </p>
              <p className="text-lg text-blue-100 leading-relaxed">
                "To provide Timely and Affordable Legal Services" - Dedicated to delivering professional legal representation 
                with integrity, expertise, and unwavering commitment to justice for clients across Kenya.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                  <img
                    src="/lovable-uploads/00794513-1237-4309-b855-598e2c8c5109.png"
                    alt="Francis Mwaura Muroki - Principal Advocate"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black p-3 rounded-full">
                  <Scale className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Biography */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    Professional Biography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Francis Mwaura Muroki is the Principal Advocate and founder of Mwaura Muroki Associates & Advocates, 
                    a distinguished law firm established in May 2022 in Thika, Kenya. With a passion for justice and 
                    unwavering commitment to client service, Francis has built a reputation as one of Kenya's most 
                    promising young legal professionals.
                  </p>
                  
                  <p className="leading-relaxed">
                    As a licensed advocate of the High Court of Kenya and member of the Law Society of Kenya (LSK), 
                    Francis brings a unique blend of legal expertise and psychology-informed support to his practice. 
                    His approach to law is grounded in the firm's core values of integrity, service delivery, 
                    cost-friendliness, accessibility, and justice.
                  </p>
                  
                  <p className="leading-relaxed">
                    Francis has distinguished himself not only in legal practice but also in professional leadership 
                    and community service. His recognition as the Young Male Lawyer of the Year in 2024 by the 
                    Paralegal Society of Kenya and Kituo Cha Sheria reflects his dedication to excellence and 
                    his contribution to the advancement of legal practice in Kenya.
                  </p>
                  
                  <p className="leading-relaxed">
                    Beyond his legal practice, Francis is an active voice in legal discourse, serving as a columnist 
                    for Kenya Times, where he shares insights on legal matters affecting everyday Kenyans. His 
                    international recognition came in 2025 when he represented Kenya at the Open Dialogue Conference 
                    in Moscow, showcasing his expertise on the global stage.
                  </p>
                </CardContent>
              </Card>

              {/* Areas of Expertise */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                    Areas of Expertise
                  </CardTitle>
                  <CardDescription>
                    Specialized legal services across multiple practice areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {specializations.map((spec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <spec.icon className="w-5 h-5 text-blue-600" />
                        <Badge variant="secondary" className={spec.color}>
                          {spec.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a href="tel:+254704780934" className="text-blue-600 hover:underline">
                      +254 704 780 934
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    <a href="https://wa.me/254704780934" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      WhatsApp
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div className="flex flex-col">
                      <a href="mailto:mwauramurokiadvocates@gmail.com" className="text-blue-600 hover:underline text-sm">
                        mwauramurokiadvocates@gmail.com
                      </a>
                      <a href="mailto:mwaurafmuroki@yahoo.com" className="text-blue-600 hover:underline text-sm">
                        mwaurafmuroki@yahoo.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div className="flex flex-col">
                      <span className="font-medium">Equity Plaza Commercial Street</span>
                      <span className="text-sm">4th Floor Wing B Rm 420, Thika</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Firm Established:</span>
                    <span className="font-semibold">May 2022</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Licensed Since:</span>
                    <span className="font-semibold">2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Location:</span>
                    <span className="font-semibold">Thika, Kenya</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Languages:</span>
                    <span className="font-semibold">English, Swahili</span>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Need Legal Assistance?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Schedule a consultation to discuss your legal matter with Francis Mwaura Muroki.
                  </p>
                  <div className="space-y-2">
                    <Button asChild className="w-full" size="sm">
                      <Link to="/contact">Book Consultation</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <a href="tel:+254704780934">Call Now</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Timeline */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Professional Timeline</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Key milestones and achievements in Francis Mwaura Muroki's legal career
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                      {item.year}
                    </div>
                    
                    {/* Content */}
                    <Card className="flex-1 hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Firm Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Our Firm</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Mwaura Muroki Associates & Advocates - Excellence in Legal Practice
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-6 h-6 text-blue-600" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  "To provide Timely and Affordable Legal Services" - We are committed to making quality legal 
                  representation accessible to all, while maintaining the highest standards of professional excellence 
                  and ethical practice.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-blue-600" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Integrity in all our dealings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Timely service delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Cost-friendly legal solutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Accessible legal services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Commitment to justice</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
