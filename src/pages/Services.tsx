
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Building, Users, FileText, Briefcase, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Family Law",
      description: "Comprehensive family legal services with compassionate representation",
      details: [
        "Divorce and separation proceedings",
        "Child custody and support matters",
        "Matrimonial property disputes",
        "Adoption procedures",
        "Family mediation services",
        "Domestic violence protection orders"
      ]
    },
    {
      icon: Shield,
      title: "Criminal Law",
      description: "Strong defense representation in criminal matters",
      details: [
        "Criminal defense representation",
        "Bail applications and hearings",
        "Appeals and case reviews",
        "White-collar crime defense",
        "Traffic offense representation",
        "Criminal case consultations"
      ]
    },
    {
      icon: Building,
      title: "Property & Conveyancing",
      description: "Expert guidance in property transactions and land matters",
      details: [
        "Property transfers and conveyancing",
        "Land registration and titling",
        "Property dispute resolution",
        "Lease agreements and tenancy law",
        "Property development law",
        "Land acquisition procedures"
      ]
    },
    {
      icon: Users,
      title: "Employment & Labour Law",
      description: "Protecting your rights in the workplace",
      details: [
        "Employment contract drafting and review",
        "Wrongful termination cases",
        "Workplace discrimination matters",
        "Labour dispute resolution",
        "Collective bargaining agreements",
        "Employment compliance advice"
      ]
    },
    {
      icon: Briefcase,
      title: "Business & Commercial Law",
      description: "Comprehensive legal support for your business needs",
      details: [
        "Company formation and registration",
        "Commercial contract drafting",
        "Business dispute resolution",
        "Intellectual property protection",
        "Regulatory compliance",
        "Mergers and acquisitions"
      ]
    },
    {
      icon: FileText,
      title: "Wills, Probate & Estate Planning",
      description: "Securing your legacy and protecting your loved ones",
      details: [
        "Will drafting and execution",
        "Estate planning strategies",
        "Probate administration",
        "Succession planning",
        "Trust establishment",
        "Estate dispute resolution"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Legal Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Comprehensive legal solutions tailored to meet your specific needs with professional excellence
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <service.icon className="w-12 h-12 text-blue-600" />
                    <div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-lg">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-blue-600 mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't navigate your legal challenges alone. Contact us today for expert legal guidance 
            and professional representation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
            
            <Button asChild size="lg" variant="outline">
              <a href="tel:0796985336" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call: 0796985336
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
