import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Scale, Globe, Gavel, Landmark, Users, HeartHandshake, type LucideIcon } from "lucide-react";
import kenyaJudiciaryLogo from "@/assets/kenya-judiciary-logo.png";
import ibaLogo from "@/assets/iba-logo.png";
import lawSocietyKenyaLogo from "@/assets/law-society-kenya-logo.png";
import eastAfricaLawSocietyLogo from "@/assets/east-africa-law-society-logo.png";
import paralegalSocietyKenyaLogo from "@/assets/paralegal-society-kenya-logo.png";
import kituoChaSheriaLogo from "@/assets/kituo-cha-sheria-logo.png";

interface Partner {
  name: string;
  description: string;
  image?: string;
  icon: LucideIcon;
}

const PartnersSection = () => {
  const partners: Partner[] = [
    {
      name: "Law Society of Kenya",
      description: "Professional legal association",
      image: lawSocietyKenyaLogo,
      icon: Scale
    },
    {
      name: "East Africa Law Society",
      description: "Regional legal network",
      image: eastAfricaLawSocietyLogo,
      icon: Globe
    },
    {
      name: "International Bar Association",
      description: "Global legal community",
      image: ibaLogo,
      icon: Gavel
    },
    {
      name: "Kenya Judiciary",
      description: "Court system partnership",
      image: kenyaJudiciaryLogo,
      icon: Landmark
    },
    {
      name: "Paralegal Society of Kenya",
      description: "Young Male Lawyer of the Year 2024",
      image: paralegalSocietyKenyaLogo,
      icon: Users
    },
    {
      name: "Kituo Cha Sheria",
      description: "Legal aid and advocacy partner",
      image: kituoChaSheriaLogo,
      icon: HeartHandshake
    }
  ];

  const scrollingPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">Our Professional Partners</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Collaborating with leading legal institutions to provide comprehensive legal services
          </p>
        </div>

        <div className="relative">
          <div className="flex space-x-6 animate-scroll-right motion-reduce:animate-none hover:[animation-play-state:paused]">
            {scrollingPartners.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-64"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % partners.length) * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full transition-all duration-300 hover:border-gold-500/40 hover:shadow-lg hover:shadow-gold-500/10 bg-card border-border">
                  <CardContent className="p-4 text-center">
                    <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-muted/50 p-3">
                      {partner.image ? (
                        <img
                          src={partner.image}
                          alt={`${partner.name} logo`}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <partner.icon className="h-12 w-12 text-blue-700 dark:text-gold-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <partner.icon className="w-5 h-5 text-blue-700 dark:text-gold-400" />
                      <h4 className="font-semibold">{partner.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {partner.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="absolute top-0 left-0 w-16 sm:w-24 h-full bg-gradient-to-r from-card to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 sm:w-24 h-full bg-gradient-to-l from-card to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;