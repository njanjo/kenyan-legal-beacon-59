
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Award, BookOpen, Users, Calendar, MapPin, Trophy } from "lucide-react";
import PartnersSection from "@/components/PartnersSection";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4">About Mwaura Muroki Associates & Advocates</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Dedicated to providing exceptional legal services with integrity and professionalism since 2022
            </p>
          </motion.div>
        </div>
      </section>

      {/* Francis Mwaura Muroki Profile Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-full overflow-hidden mb-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Francis Mwaura Muroki - Principal Advocate"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
                <Scale className="w-6 h-6" />
                <span className="text-lg font-semibold">Principal Advocate</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 dark:text-white">Francis Mwaura Muroki</h2>
              <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6">
                Francis Mwaura Muroki is the Principal Advocate at Mwaura Muroki Associates & Advocates, 
                bringing years of dedicated legal experience and a passion for justice to every case. 
                Licensed by the Law Society of Kenya since 2020, Francis has established himself as a 
                trusted legal professional in Thika and beyond.
              </p>
              
              <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6">
                With a specialized focus on commercial litigation, family law, and sports law, Francis 
                combines traditional legal expertise with innovative approaches to dispute resolution. 
                His psychology-informed legal practice brings a unique understanding to complex legal matters, 
                ensuring comprehensive support for every client.
              </p>
              
              {/* Firm Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold">Firm Established:</span>
                  <span>May 2022</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold">Location:</span>
                  <span>Thika, Kenya</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold">LSK License:</span>
                  <span>2020 - Present</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Awards and Recognition Timeline */}
          <div className="mb-16">
            <motion.h3 
              className="text-3xl font-bold text-center mb-12 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Awards & Recognition
            </motion.h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  year: "2025",
                  title: "International Representative",
                  description: "Represented Kenya at Open Dialogue Conference, Moscow",
                  icon: Trophy,
                  color: "text-yellow-600 dark:text-yellow-400"
                },
                {
                  year: "2024",
                  title: "Young Male Lawyer of the Year",
                  description: "Paralegal Society of Kenya & Kituo Cha Sheria",
                  icon: Award,
                  color: "text-blue-600 dark:text-blue-400"
                },
                {
                  year: "2024",
                  title: "Legal Columnist",
                  description: "Kenya Times Columnist",
                  icon: BookOpen,
                  color: "text-green-600 dark:text-green-400"
                },
                {
                  year: "2024 - Present",
                  title: "Vice Secretary",
                  description: "LSK Thika Chapter",
                  icon: Users,
                  color: "text-purple-600 dark:text-purple-400"
                },
                {
                  year: "2022 - 2024",
                  title: "Thika Representative",
                  description: "LSK Thika Chapter",
                  icon: Users,
                  color: "text-orange-600 dark:text-orange-400"
                },
                {
                  year: "2020 - 2025",
                  title: "Licensed Advocate",
                  description: "Law Society of Kenya",
                  icon: Scale,
                  color: "text-red-600 dark:text-red-400"
                }
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <achievement.icon className={`w-12 h-12 ${achievement.color} mx-auto mb-4`} />
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">{achievement.year}</div>
                      <h4 className="text-lg font-semibold mb-2 dark:text-white">{achievement.title}</h4>
                      <p className="text-muted-foreground dark:text-gray-300 text-sm">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Professional Qualifications */}
          <div className="mb-16">
            <motion.h3 
              className="text-3xl font-bold text-center mb-12 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Education & Professional Qualifications
            </motion.h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Legal Education",
                  items: [
                    "• Bachelor of Laws (LL.B)",
                    "• Diploma in Legal Practice", 
                    "• Advocate of the High Court of Kenya",
                    "• Continuing Legal Education (CLE) Certified"
                  ]
                },
                {
                  icon: Award,
                  title: "Professional Memberships",
                  items: [
                    "• Law Society of Kenya (LSK)",
                    "• East Africa Law Society",
                    "• International Bar Association", 
                    "• Kenya Association of Legal Professionals"
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <section.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                      <h4 className="text-xl font-semibold mb-3 dark:text-white">{section.title}</h4>
                      <ul className="space-y-2 text-muted-foreground dark:text-gray-300">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div>
            <motion.h3 
              className="text-3xl font-bold text-center mb-12 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Core Values
            </motion.h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Scale,
                  title: "Integrity",
                  description: "We uphold the highest ethical standards in all our professional dealings, ensuring honest and transparent communication with our clients."
                },
                {
                  icon: Users,
                  title: "Professionalism", 
                  description: "Our commitment to excellence drives us to deliver the highest quality legal services with meticulous attention to detail and thorough preparation."
                },
                {
                  icon: Award,
                  title: "Confidentiality",
                  description: "We maintain absolute confidentiality and discretion in all client matters, ensuring your privacy and trust are never compromised."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <value.icon className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                      <h4 className="text-2xl font-semibold mb-3 dark:text-white">{value.title}</h4>
                      <p className="text-muted-foreground dark:text-gray-300">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
};

export default About;
