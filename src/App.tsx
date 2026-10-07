
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import CookieConsent from "./components/CookieConsent";
import Index from "./pages/Index";
// Below-the-fold / route-level chunks: split out of the homepage bundle so
// first paint ships only what the landing page needs. Index stays eager to
// avoid a lazy-loading waterfall on the landing page.
const AIChatbot = lazy(() => import("./components/AIChatbot"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const LegalDisclaimer = lazy(() => import("./pages/LegalDisclaimer"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const MediaDashboard = lazy(() => import("./components/MediaDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Suspense fallback={null}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/media" element={<MediaDashboard />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
                    <Route path="/terms-conditions" element={<TermsConditions />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />

              <CookieConsent />
              <Suspense fallback={null}>
                <AIChatbot />
              </Suspense>
            </div>
          </BrowserRouter>
        </MotionConfig>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
