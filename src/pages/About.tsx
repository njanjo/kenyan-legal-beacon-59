
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Award, BookOpen, Users } from "lucide-react";
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
            <h1 className="text-5xl font-bold mb-4">About Our Practice</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Dedicated to providing exceptional legal services with integrity and professionalism
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-full flex items-center justify-center mb-8 shadow-2xl">
                <Scale className="w-32 h-32 text-white" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 dark:text-white">Professional Legal Advocate</h2>
              <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6">
                With years of experience in the Kenyan legal system, our practice is built on a foundation of 
                trust, expertise, and unwavering commitment to our clients' success. We understand that legal 
                challenges can be overwhelming, which is why we provide personalized, professional guidance 
                every step of the way.
              </p>
              
              <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6">
                As a licensed advocate of the High Court of Kenya and member of the Law Society of Kenya (LSK), 
                we bring comprehensive legal knowledge and ethical practice to every case we handle.
              </p>
              
              <div className="flex items-center gap-4 text-blue-600 dark:text-blue-400">
                <Award className="w-8 h-8" />
                <span className="text-lg font-semibold">Licensed Advocate & LSK Member</span>
              </div>
            </motion.div>
          </div>

          {/* Education & Qualifications */}
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
                    "• Kenya Association of Women Judges"
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
