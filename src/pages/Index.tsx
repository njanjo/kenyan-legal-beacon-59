import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, Shield, Users, Building, Heart, Phone, MessageCircle, Award, Gavel, Briefcase, Landmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PartnersSection from "@/components/PartnersSection";
import SEO, { SITE_URL, attorneySchema } from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";

// pdf-lib is ~500 KB — load the downloads section on demand so the
// homepage first paint doesn't pay for PDF generation capability.
const DownloadsSection = lazy(() => import("@/components/DownloadsSection"));

/** Decorative fluted columns motif (courthouse portico) — watermarked, legal-themed. */
const ColumnsMotif = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 320 400" fill="none" aria-hidden="true" className={className}>
    {[40, 120, 200].map((x) => (
      <g key={x} stroke="currentColor" strokeWidth="1.2">
        <rect x={x - 5} y={24} width="34" height="12" rx="3" />
        <rect x={x} y={40} width="24" height="340" rx="3" />
        <line x1={x + 6} y1={40} x2={x + 6} y2={380} />
        <line x1={x + 12} y1={40} x2={x + 12} y2={380} />
        <line x1={x + 18} y1={40} x2={x + 18} y2={380} />
        <rect x={x - 5} y={384} width="34" height="12" rx="3" />
      </g>
    ))}
  </svg>
);

const Index = () => {
  // Legal services data with improved structure
  // Slugs mirror Services.tsx slugify() output so hero links land on the exact card.
  const legalServices = [
    {
      icon: Gavel,
      title: "Commercial Litigation",
      slug: "commercial-litigation",
      description: "Expert representation in commercial disputes, contract breaches, and business litigation matters"
    },
    {
      icon: FileText,
      title: "Contract Drafting & Negotiation",
      slug: "contract-drafting-and-negotiation",
      description: "Professional contract drafting, review, and negotiation services for businesses and individuals"
    },
    {
      icon: Shield,
      title: "Dispute Resolution",
      slug: "dispute-resolution",
      description: "Alternative dispute resolution including mediation, arbitration, and conflict resolution"
    },
    {
      icon: Heart,
      title: "Family Law",
      slug: "family-law",
      description: "Child custody, maintenance, adoption, and comprehensive family legal support"
    },
    {
      icon: Users,
      title: "Sports Law",
      slug: "sports-law",
      description: "Legal representation for athletes, sports organizations, and sports-related contractual matters"
    },
    {
      icon: Scale,
      title: "Legal Research",
      slug: "legal-research",
      description: "Comprehensive legal research services for complex legal matters and case preparation"
    },
    {
      icon: Building,
      title: "Mental Health Law",
      slug: "mental-health-law",
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
      description: "Timely and effective legal services with meticulous attention to detail"
    },
    {
      icon: FileText,
      title: "Effectiveness",
      description: "Effective legal services without compromising on quality"
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

  // Trust-strip credentials: data-driven so adding/removing one never
  // means touching markup in three places.
  const trustStats = [
    {
      icon: Gavel,
      title: "High Court",
      subtitle: "Advocate of Kenya",
    },
    {
      icon: Award,
      title: "LSK",
      subtitle: "Member",
    },
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
      <SEO
        title="Lawyer in Thika & Kenya | Commercial, Family & Sports Law – Mwaura Muroki Associates"
        description="Mwaura Muroki Associates & Advocates – timely, effective lawyers in Thika serving Nairobi & Kenya. Commercial litigation, contracts, dispute resolution, family law, sports law & mental health law. Call +254 704 780 934."
        canonical={SITE_URL + "/"}
        keywords="lawyer Thika, advocate Thika, law firm Kenya, commercial litigation Kenya, family lawyer Kenya, sports lawyer Kenya, contract lawyer Nairobi, dispute resolution Kenya, Francis Mwaura Muroki"
        schema={[
          attorneySchema,
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Mwaura Muroki Associates & Advocates",
            url: SITE_URL + "/",
          },
        ]}
      />
      {/* Hero Section — full-bleed navy canvas, portrait blended left, legal motif backdrop */}
      <section className="relative isolate min-h-[94vh] overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 dark:from-navy-950 dark:via-navy-950 dark:to-navy-900 text-white">
        {/* Atmosphere: soft gold + court-blue glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(245,158,11,0.12),transparent_42%),radial-gradient(circle_at_45%_108%,rgba(37,71,184,0.38),transparent_55%)]"
        />

        {/* Legal motif watermarks (no gridlines) */}
        <Scale
          aria-hidden
          strokeWidth={0.8}
          size={620}
          className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 rotate-12 text-gold-300 opacity-[0.05]"
        />
        <Gavel
          aria-hidden
          strokeWidth={0.9}
          size={300}
          className="pointer-events-none absolute -bottom-16 right-24 text-gold-300 opacity-[0.05]"
        />
        <ColumnsMotif className="pointer-events-none absolute -right-2 top-1/2 h-[86vh] w-auto -translate-y-1/2 text-blue-200 opacity-[0.06]" />
        <Landmark
          aria-hidden
          strokeWidth={1}
          size={360}
          className="pointer-events-none absolute -left-40 top-16 text-blue-200 opacity-[0.05]"
        />

        {/* Edge vignette so the photograph melts into the scene */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,9,26,0.55)_100%)]"
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-28">
          {/* Left: the portrait — frameless, blending into the canvas */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative order-2 justify-self-center lg:order-1 lg:justify-self-end lg:-mr-8"
          >
            {/* pooled light behind the subject */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/3 h-[115%] w-[115%] -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl"
            />

            <img
              src="/uploads/attorney-cutout.webp"
              alt="Francis Mwaura Muroki – Principal Advocate, lawyer in Thika Kenya"
              width={768}
              height={1158}
              loading="eager"
              decoding="async"
              className="relative mx-auto block aspect-[900/1357] w-full max-w-[26rem] object-cover object-top saturate-[0.9] brightness-[0.97] contrast-[0.97]"
            />
            {/* tone-matching wash so his palette sits inside the navy scene */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-t from-navy-900/50 via-transparent to-navy-950/40"
            />
          </motion.div>

          {/* Right: message */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 flex flex-col items-start text-left lg:order-2 lg:max-w-xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-300">
              <Scale className="h-4 w-4" />
              Licensed Advocates · Thika, Kenya · Est. 2022
            </span>

            <h1 className="mt-7 font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl lg:mt-8 lg:text-6xl">
              Mwaura Muroki{" "}
              <span className="text-gold-400 italic">Associates &amp; Advocates</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100 sm:text-xl">
              <span className="block font-display text-xl sm:text-2xl italic text-gold-300">
                &ldquo;To provide timely and effective legal services.&rdquo;
              </span>
              <span className="mt-2 block">
                Professional legal services in Kenya, delivered with integrity, expertise, and dedication to justice.
              </span>
            </p>

            <p className="mt-7 font-display text-lg text-blue-100">
              Francis Mwaura Muroki <span className="text-gold-300">· Principal Advocate</span>
            </p>

            <div className="mt-10 flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:items-center sm:gap-3">
              <Button
                asChild
                size="lg"
                className="w-full justify-center bg-gold-400 text-navy-950 hover:bg-gold-300 font-bold shadow-lg shadow-gold-400/20 transition-all duration-300 sm:w-auto"
              >
                <Link to="/contact">Book a Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full justify-center border-white/60 bg-white/10 text-white font-bold backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-navy-900 sm:w-auto"
              >
                <a href="tel:+254704780934">
                  <Phone className="h-5 w-5" />
                  Call: +254 704 780 934
                </a>
              </Button>
            </div>

            {/* Trust indicator strip — single line on 360px+ screens, wraps only on very small ones */}
            <div className="mt-10 flex flex-wrap items-center gap-2 text-xs text-blue-100 min-[360px]:flex-nowrap sm:mt-12 sm:gap-x-8 sm:text-sm">
              <Link
                to="/services"
                aria-label="Explore all 7 practice areas"
                className="group inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border border-gold-400/50 bg-gold-400/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-gold-300 hover:bg-gold-400/20 hover:shadow-lg hover:shadow-gold-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 active:scale-[0.98] sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <Briefcase className="h-4 w-4 shrink-0 text-gold-400 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5" />
                <span className="whitespace-nowrap">
                  <span className="font-display text-sm font-semibold sm:text-lg">7</span> Practice Areas
                </span>
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-gold-400 transition-transform duration-300 group-hover:translate-x-1 min-[480px]:block" />
              </Link>
              {trustStats.map((stat) => (
                <div
                  key={stat.title}
                  className="flex shrink-0 items-center gap-1.5 sm:gap-2.5 sm:border-l sm:border-white/10 sm:pl-8"
                >
                  <stat.icon className="h-4 w-4 shrink-0 text-gold-400 sm:h-5 sm:w-5" />
                  <span className="whitespace-nowrap">
                    <span className="block font-display text-sm font-semibold text-white sm:text-lg">
                      {stat.title}
                    </span>
                    <span className="hidden min-[480px]:block">{stat.subtitle}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ornamental hairline divider into the next section */}
        <div aria-hidden className="relative z-10 mx-auto flex max-w-6xl items-center gap-3 px-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/50 to-gold-400/50" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold-400/80" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-400/50 to-gold-400/50" />
        </div>
      </section>

      {/* Brand Values Featured Quote Section */}
      <section className="py-12 sm:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Guided by principles of <strong>Integrity, Service Delivery, Effectiveness, Accessibility, and Justice</strong>
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
                        <Link to={`/services#${service.slug}`}>More Info</Link>
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
      <ErrorBoundary>
        <Suspense fallback={null}>
          <DownloadsSection />
        </Suspense>
      </ErrorBoundary>

      {/* Enhanced Contact CTA Section */}
      <section className="py-12 sm:py-16 bg-navy-900 dark:bg-navy-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Legal Help?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-blue-100">
            Contact us today for a consultation and let us help you navigate your legal challenges
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto justify-center bg-gold-400 text-navy-950 hover:bg-gold-300 font-bold shadow-lg transition-all duration-300">
              <Link to="/contact">Book Consultation</Link>
            </Button>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto justify-center border-white/60 text-white hover:bg-white hover:text-navy-900 bg-white/10 font-bold">
                <a href="tel:+254704780934" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Now
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto justify-center border-white/60 text-white hover:bg-white hover:text-navy-900 bg-white/10 font-bold">
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