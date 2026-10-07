import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, FileText, Shield, Heart, Users, Brain, Briefcase, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import SEO, { SITE_URL } from "@/components/SEO";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Services = () => {
  const services = [
    {
      icon: Gavel,
      title: "Commercial Litigation",
      description: "Expert representation in commercial disputes and business litigation",
      details: [
        "Commercial contract disputes",
        "Business partnership conflicts",
        "Breach of contract cases",
        "Corporate litigation matters",
        "Debt recovery proceedings",
        "Commercial arbitration representation"
      ]
    },
    {
      icon: FileText,
      title: "Contract Drafting & Negotiation",
      description: "Professional contract services for businesses and individuals",
      details: [
        "Business contract drafting",
        "Employment agreement preparation",
        "Service agreement negotiations",
        "Partnership agreement drafting",
        "Contract review and analysis",
        "Terms and conditions development"
      ]
    },
    {
      icon: Shield,
      title: "Dispute Resolution",
      description: "Alternative dispute resolution and conflict management",
      details: [
        "Mediation services",
        "Arbitration representation",
        "Negotiation facilitation",
        "Conflict resolution strategies",
        "Settlement negotiations",
        "ADR consultation services"
      ]
    },
    {
      icon: Heart,
      title: "Family Law",
      description: "Comprehensive family legal services with compassionate support",
      details: [
        "Child custody proceedings",
        "Child maintenance matters",
        "Adoption procedures and documentation",
        "Divorce and separation cases",
        "Matrimonial property disputes",
        "Family mediation services"
      ]
    },
    {
      icon: Users,
      title: "Sports Law",
      description: "Specialized legal services for athletes and sports organizations",
      details: [
        "Athlete contract negotiations",
        "Sports organization legal matters",
        "Sponsorship agreement drafting",
        "Sports dispute resolution",
        "Anti-doping legal support",
        "Sports governance compliance"
      ]
    },
    {
      icon: Briefcase,
      title: "Legal Research",
      description: "Comprehensive legal research and case preparation services",
      details: [
        "Case law research and analysis",
        "Legal precedent identification",
        "Statutory interpretation research",
        "Legal opinion preparation",
        "Regulatory compliance research",
        "Legal memoranda drafting"
      ]
    },
    {
      icon: Brain,
      title: "Mental Health Law",
      description: "Psychology-informed legal support with specialized understanding",
      details: [
        "Mental health advocacy",
        "Capacity assessment legal support",
        "Mental health tribunal representation",
        "Psychology-informed legal consultation",
        "Mental health rights protection",
        "Guardianship and conservatorship matters"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Legal Services in Kenya – Litigation, Contracts, Family, Sports Law | Mwaura Muroki"
        description="Full legal services in Thika & Kenya: commercial litigation, contract drafting & negotiation, mediation & arbitration, child custody & family law, sports law, legal research, mental health law."
        canonical={`${SITE_URL}/services`}
        keywords="commercial litigation Kenya, contract drafting Kenya, dispute resolution Thika, family lawyer Thika custody maintenance adoption, sports law Kenya, mental health law Kenya, legal research Kenya"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              provider: { "@type": "Attorney", name: "Mwaura Muroki Associates & Advocates", url: SITE_URL },
              areaServed: "Kenya",
              url: `${SITE_URL}/services#${slugify(s.title)}`,
            },
          })),
        }}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy-900 to-navy-700 dark:from-navy-950 dark:to-navy-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Our Legal Services</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-blue-100">
            Comprehensive legal solutions from Mwaura Muroki Associates &amp; Advocates, 
            tailored to meet your specific needs with professional excellence
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const isLast = index === services.length - 1;
              return (
                <Card
                  key={index}
                  id={slugify(service.title)}
                  className={`scroll-mt-24 transition-all duration-300 hover:border-blue-700/40 hover:shadow-xl hover:shadow-blue-700/10 dark:hover:border-gold-400/40 ${
                    isLast ? "lg:col-span-2" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-blue-700/10 dark:bg-gold-400/10">
                        <service.icon className="w-7 h-7 text-blue-700 dark:text-gold-400" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                        <CardDescription className="text-lg">{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className={`gap-2 ${isLast ? "grid sm:grid-cols-3" : "space-y-2"}`}>
                      {service.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-gold-500 mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't navigate your legal challenges alone. Contact Mwaura Muroki Associates &amp; Advocates 
            today for expert legal guidance and professional representation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Book Consultation</Link>
            </Button>
            
            <Button asChild size="lg" variant="outline">
              <a href="tel:+254704780934" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call: +254 704 780 934
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;