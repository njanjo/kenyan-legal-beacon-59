
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import kenyaJudiciaryLogo from "@/assets/kenya-judiciary-logo.png";
import ibaLogo from "@/assets/iba-logo.png";
import lawSocietyKenyaLogo from "@/assets/law-society-kenya-logo.png";
import eastAfricaLawSocietyLogo from "@/assets/east-africa-law-society-logo.png";
import attorneyOffice1 from "/lovable-uploads/00794513-1237-4309-b855-598e2c8c5109.png";
import attorneyOffice2 from "/lovable-uploads/7ac751ff-dfac-4f6b-9e97-e9e8eb7fe3b8.png";

const PartnersSection = () => {
  const partners = [
    {
      name: "Kenya Law Society",
      description: "Professional legal association",
      image: lawSocietyKenyaLogo
    },
    {
      name: "East Africa Law Society", 
      description: "Regional legal network",
      image: eastAfricaLawSocietyLogo
    },
    {
      name: "International Bar Association",
      description: "Global legal community", 
      image: ibaLogo
    },
    {
      name: "Kenya Judiciary",
      description: "Court system partnership",
      image: kenyaJudiciaryLogo
    },
    {
      name: "Mwaura Muroki Associates",
      description: "Our law firm offices",
      image: attorneyOffice1
    },
    {
      name: "Legal Excellence Center",
      description: "Professional legal services",
      image: attorneyOffice2
    }
  ];

  // Duplicate partners for seamless scrolling
  const scrollingPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Professional Partners</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Collaborating with leading legal institutions to provide comprehensive legal services
          </p>
        </div>
        
        {/* Scrolling Partners Container */}
        <div className="relative">
          <div className="flex space-x-6 animate-scroll-right">
            {scrollingPartners.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-64"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (index % partners.length) * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 group">
                  <CardContent className="p-4 text-center">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img 
                        src={partner.image} 
                        alt={partner.name}
                        className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {partner.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Gradient Overlays for Seamless Effect */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
