import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, AlertCircle, Facebook, Instagram, Linkedin, Twitter, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Consultation request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:mwauramurokiadvocates@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setSubmitStatus('success');
    setFormData({ name: "", email: "", phone: "", message: "" });
    toast({
      title: "Opening your email client…",
      description: "Your message has been prepared. We'll respond within 24 hours.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background page-transition"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy-900 to-navy-700 dark:from-navy-950 dark:to-navy-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-blue-100">
            Get in touch for professional legal consultation and representation
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  Send Us a Message
                  {submitStatus === 'success' && (
                    <CheckCircle className="w-6 h-6 text-green-500" aria-hidden />
                  )}
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div aria-live="polite">
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden />
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        Your email client should now open with your message ready to send. We'll respond within 24 hours.
                      </p>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number (optional)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your legal matter or questions"
                      rows={5}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full btn-glow">
                    Send Message
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Prefer instant messaging?{" "}
                    <a
                      href={`https://wa.me/254704780934?text=${encodeURIComponent("Hello, I'd like to book a legal consultation.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-blue-700 dark:text-gold-400 hover:underline"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-6 h-6 text-blue-700 dark:text-gold-400" />
                    Phone & WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Call or WhatsApp</p>
                      <a href="tel:+254704780934" className="text-blue-700 dark:text-gold-400 hover:underline text-lg">
                        +254 704 780 934
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp Chat</p>
                      <a
                        href="https://wa.me/254704780934"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-700 dark:text-gold-400 hover:underline text-lg"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-6 h-6 text-blue-700 dark:text-gold-400" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <a href="mailto:mwauramurokiadvocates@gmail.com" className="block text-blue-700 dark:text-gold-400 hover:underline text-lg break-all">
                      mwauramurokiadvocates@gmail.com
                    </a>
                    <a href="mailto:mwaurafmuroki@yahoo.com" className="block text-blue-700 dark:text-gold-400 hover:underline text-lg break-all">
                      mwaurafmuroki@yahoo.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-blue-700 dark:text-gold-400" />
                    Working Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM</p>
                    <p><strong>Saturday:</strong> 9:00 AM - 1:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      Emergency consultations available by appointment
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-blue-700 dark:text-gold-400" />
                    Office Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Mwaura Muroki Associates &amp; Advocates</p>
                      <p>Equity Plaza Commercial Street</p>
                      <p>4th Floor Wing B Room 420</p>
                      <p>Thika, Kenya</p>
                    </div>

                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-blue-700 dark:text-gold-400" />
                        Get Directions
                      </p>
                      <a
                        href="https://maps.google.com/maps?q=Equity+Plaza+Commercial+Street+Thika+Kenya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-700 dark:text-gold-400 hover:underline"
                      >
                        <MapPin className="w-4 h-4" />
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://facebook.com/francis.muroki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 dark:text-gold-400 hover:underline transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                      Francis Muroki
                    </a>
                    <a
                      href="https://instagram.com/IamMwauraMuroki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 dark:text-gold-400 hover:underline transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                      @IamMwauraMuroki
                    </a>
                    <a
                      href="https://linkedin.com/in/mwaura-muroki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 dark:text-gold-400 hover:underline transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      Mwaura Muroki
                    </a>
                    <a
                      href="https://twitter.com/Iammwauramuroki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 dark:text-gold-400 hover:underline transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                      @Iammwauramuroki
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 bg-muted/40">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-700 dark:text-gold-400" />
                Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The information on this website is for informational purposes only and should not be relied upon as legal advice.
                We are not liable for any harm or injury resulting from reliance on the information herein. For specific legal
                advice regarding your situation, please schedule a consultation with our attorneys.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <Link to="/privacy-policy" className="text-blue-700 dark:text-gold-400 hover:underline">Privacy Policy</Link>
                <Link to="/terms-conditions" className="text-blue-700 dark:text-gold-400 hover:underline">Terms &amp; Conditions</Link>
                <Link to="/legal-disclaimer" className="text-blue-700 dark:text-gold-400 hover:underline">Legal Disclaimer</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;