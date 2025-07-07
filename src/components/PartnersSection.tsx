
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const PartnersSection = () => {
  const partners = [
    {
      name: "Kenya Law Society",
      description: "Professional legal association",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "East Africa Law Society",
      description: "Regional legal network",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "International Bar Association",
      description: "Global legal community",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Kenya Judiciary",
      description: "Court system partnership",
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Law Society of Kenya",
      description: "Legal practitioners body",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Africa Legal Network",
      description: "Continental legal alliance",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
