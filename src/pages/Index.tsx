import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, Shield, Users, Building, Heart, Phone, MessageCircle, Award, Gavel, Briefcase } from "lucide-react";
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
      description: "Expert representation in commercial disputes, contract breaches, and business litigation matters"
    },
    {
      icon: FileText,
      title: "Contract Drafting & Negotiation",
      description: "Professional contract drafting, review, and negotiation services for businesses and individuals"
    },
    {
      icon: Shield,
      title: "Dispute Resolution",
      description: "Alternative dispute resolution including mediation, arbitration, and conflict resolution"
    },
    {
      icon: Heart,
      title: "Family Law",
      description: "Child custody, maintenance, adoption, and comprehensive family legal support"
    },
    {
      icon: Users,
      title: "Sports Law",
      description: "Legal representation for athletes, sports organizations, and sports-related contractual matters"
    },
    {
      icon: Scale,
      title: "Legal Research",
      description: "Comprehensive legal research services for complex legal matters and case preparation"
    },
    {
      icon: Building,
      title: "Mental Health Law",
      description: "Psychology-informed legal support with specialized understanding of mental health matters"
    }
  ];

  // Core values data for better organization
  const brandValues = [
    {
      icon: Scale,
      title: "Integrity",
      description: "Unwavering commitment to ethical practice and honest representation"
    },
    {
      icon: Shield,
      title: "Service Delivery",
      description: "Timely and professional legal services with meticulous attention to detail"
    },
    {
      icon: FileText,
      title: "Cost-Friendliness",
      description: "Affordable legal services without compromising on quality"
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Legal services accessible to all members of the community"
    },
    {
      icon: Gavel,
      title: "Justice",
      description: "Dedicated commitment to achieving fair and just outcomes"
    }
  ];

  // Awards and recognitions with enhanced interactivity
  const awards = [
    {
      year: "2025",
      title: "International Representative",
      description: "Represented Kenya at Open Dialogue Conference, Moscow",
      icon: Award
    },
    {
      year: "2024",
      title: "Young Male Lawyer of the Year",
      description: "Paralegal Society of Kenya & Kituo Cha Sheria",
      icon: Award
    },
    {
      year: "2024",
      title: "Legal Columnist",
      description: "Kenya Times Columnist",
      icon: FileText
    },
    {
      year: "2024",
      title: "Vice Secretary",
      description: "LSK Thika Chapter",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section — two-column editorial layout with arch-framed attorney portrait */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 dark:from-navy-950 dark:via-navy-950 dark:to-navy-900 text-white">
        {/* Decorative glows + fine grid texture */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(245,158,11,0.12),transparent_42%),radial-gradient(circle_at_8%_88%,rgba(37,71,184,0.35),transparent_50%)]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[1.12fr_1fr] lg:gap-8 lg:py-24">
          {/* Left: message */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-300">
              <Scale className="h-4 w-4" />
              Licensed Advocates · Thika, Kenya · Est. 2022
            </span>

            <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Mwaura Muroki{" "}
              <span className="text-gold-400 italic">Associates &amp; Advocates</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-blue-100 sm:text-xl">
              "To provide Timely and Affordable Legal Services" — professional legal
              representation with integrity, expertise, and dedication to justice.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-gold-400 text-navy-950 hover:bg-gold-300 font-bold shadow-lg shadow-gold-400/20 transition-all duration-300"
              >
                <Link to="/contact">Book a Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 bg-white/10 text-white font-bold backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-navy-900"
              >
                <a href="tel:+254704780934">
                  <Phone className="h-5 w-5" />
                  Call: +254 704 780 934
                </a>
              </Button>
            </div>

            {/* Trust indicator strip */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-blue-100">
              <div className="flex items-center gap-2.5">
                <Briefcase className="h-5 w-5 text-gold-400" />
                <span>
                  <span className="block font-display text-lg font-semibold text-white">7</span>
                  Practice Areas
                </span>
              </div>
              <div className="flex items-center gap-2.5 border-l border-white/10 pl-8">
                <Gavel className="h-5 w-5 text-gold-400" />
                <span>
                  <span className="block font-display text-lg font-semibold text-white">High Court</span>
                  Advocate of Kenya
                </span>
              </div>
              <div className="flex items-center gap-2.5 border-l border-white/10 pl-8">
                <Award className="h-5 w-5 text-gold-400" />
                <span>
                  <span className="block font-display text-lg font-semibold text-white">LSK</span>
                  Member
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: arch-framed attorney portrait with transparent background */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[26rem]"
          >
            {/* soft glow behind shoulders */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/3 h-3/4 w-full -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl"
            />
            {/* decorative gold arc behind the arch */}
            <div
              aria-hidden
              className="absolute -inset-3 rounded-t-full border border-gold-400/30"
            />
            {/* floor shadow under the portrait */}
            <div
              aria-hidden
              className="absolute -bottom-8 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[100%] bg-black/50 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-t-full border-2 border-gold-400/50 bg-navy-900 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.7)]">
              <img
                src="/uploads/attorney-cutout.png"
                alt="Francis Mwaura Muroki, Principal Advocate"
                width={900}
                height={1357}
                loading="lazy"
                decoding="async"
                className="aspect-[900/1357] w-full object-cover object-top"
              />
              {/* faint gold sheen on the arch face */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gold-400/15 to-transparent"
              />
            </div>

            {/* floating trust badges */}
            <div className="absolute -left-3 top-[22%] flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm sm:-left-6 sm:px-4 sm:text-sm">
              <Award className="h-4 w-4 text-gold-400" />
              Member, Law Society of Kenya
            </div>
            <div className="absolute -right-3 top-[42%] flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm sm:-right-6 sm:px-4 sm:text-sm">
              <Gavel className="h-4 w-4 text-gold-400" />
              Advocate of the High Court
            </div>

            {/* name plaque */}
            <div className="mt-4 text-center">
              <p className="font-display text-xl font-semibold tracking-wide">
                Francis Mwaura Muroki
              </p>
              <p className="text-sm uppercase tracking-widest text-gold-300">
                Principal Advocate
              </p>
            </div>
          </motion.div>
        </div>

        {/* hairline divider into the next section */}
        <div aria-hidden className="relative z-10 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      </section>

      {/* Brand Values Featured Quote Section */}
      <section className="py-12 sm:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Guided by principles of <strong>Integrity, Service Delivery, Cost-Friendliness, Accessibility, and Justice</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
            {brandValues.map((value, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-700/10 dark:bg-gold-400/10 transition-transform duration-300 group-hover:scale-110">
                  <value.icon className="h-8 w-8 text-blue-700 dark:text-gold-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Overview Section */}
      <section className="py-12 sm:py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Legal Services</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive legal solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {legalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="group h-full transition-all duration-300 hover:border-blue-700/40 hover:shadow-xl hover:shadow-blue-700/10 dark:hover:border-gold-400/40 dark:hover:shadow-gold-400/10">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700/10 dark:bg-gold-400/10 transition-transform duration-300 group-hover:scale-110">
                      <service.icon className="h-6 w-6 text-blue-700 dark:text-gold-400" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl transition-colors duration-300 group-hover:text-blue-700 dark:group-hover:text-gold-400">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base mb-4">
                      {service.description}
                    </CardDescription>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link to="/services">More Info</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="flex-1">
                        <Link to="/contact">Book Consultation</Link>
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button asChild size="lg">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Awards and Recognition Section */}
      <section className="py-12 sm:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
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
                className="h-full"
              >
                <Card className="group h-full text-center transition-all duration-300 hover:border-gold-500/50 hover:shadow-xl hover:shadow-gold-500/10">
                  <CardHeader className="pb-4">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/10">
                      <award.icon className="h-7 w-7 text-gold-600 dark:text-gold-400 transition-transform duration-300 group-hover:scale-125" />
                    </div>
                    <div className="mb-2 font-display text-3xl font-bold text-blue-700 dark:text-gold-400">
                      {award.year}
                    </div>
                    <CardTitle className="text-lg mb-2">{award.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {award.description}
                    </CardDescription>
                  </CardHeader>
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
      <section className="py-12 sm:py-16 bg-navy-900 dark:bg-navy-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Legal Help?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-blue-100">
            Contact us today for a consultation and let us help you navigate your legal challenges
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gold-400 text-navy-950 hover:bg-gold-300 font-bold shadow-lg transition-all duration-300">
              <Link to="/contact">Book Consultation</Link>
            </Button>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" variant="outline" className="border-white/60 text-white hover:bg-white hover:text-navy-900 bg-white/10 font-bold">
                <a href="tel:+254704780934" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Now
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="border-white/60 text-white hover:bg-white hover:text-navy-900 bg-white/10 font-bold">
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