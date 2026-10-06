import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, AlertCircle, Facebook, Instagram, Linkedin, Twitter, Navigation, Paperclip, FileText, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: string;
        }
      ) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

const CONTACT_API_ENDPOINT = "/api/contact";
const MAX_FILE_COUNT = 5;
const MAX_TOTAL_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = new Set(["pdf", "doc", "docx", "jpg", "jpeg", "png"]);
const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_SITE_KEY: string | undefined = import.meta.env
  .VITE_TURNSTILE_SITE_KEY as string | undefined;

const emptyFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

const createFileId = (): string =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileExtension = (name: string): string => {
  const index = name.lastIndexOf(".");
  return index === -1 ? "" : name.slice(index + 1).toLowerCase();
};

const extractApiErrorMessage = (data: unknown): string | null => {
  if (typeof data !== "object" || data === null) return null;
  const error = (data as { error?: unknown }).error;
  return typeof error === "string" && error.length > 0 ? error : null;
};

const Contact = () => {
  const [formData, setFormData] = useState(emptyFormData);
  const [honeypot, setHoneypot] = useState("");
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

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

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileContainerRef.current) return;

    const renderWidget = () => {
      if (
        turnstileWidgetIdRef.current !== null ||
        !window.turnstile ||
        !turnstileContainerRef.current
      ) {
        return;
      }
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        theme: "auto",
      });
    };

    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);
    if (existingScript) {
      if (window.turnstile) {
        renderWidget();
      } else {
        existingScript.addEventListener("load", renderWidget);
      }
    } else {
      const script = document.createElement("script");
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      const widgetId = turnstileWidgetIdRef.current;
      if (widgetId !== null) {
        window.turnstile?.remove(widgetId);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (selected.length === 0) return;

    const knownNames = new Set(files.map((f) => f.name));
    const additions: AttachedFile[] = [];
    let totalCount = files.length;
    let totalBytes = files.reduce((sum, f) => sum + f.size, 0);

    for (const file of selected) {
      const extension = getFileExtension(file.name);

      if (!ALLOWED_FILE_EXTENSIONS.has(extension)) {
        toast({
          title: "Unsupported file type",
          description: `"${file.name}" is not allowed. Accepted formats: PDF, DOC, DOCX, JPG, PNG.`,
          variant: "destructive",
        });
        continue;
      }

      if (knownNames.has(file.name)) {
        toast({
          title: "Duplicate file",
          description: `"${file.name}" is already attached.`,
          variant: "destructive",
        });
        continue;
      }

      if (totalCount >= MAX_FILE_COUNT) {
        toast({
          title: "File limit reached",
          description: `You can attach up to ${MAX_FILE_COUNT} files.`,
          variant: "destructive",
        });
        break;
      }

      if (totalBytes + file.size > MAX_TOTAL_FILE_BYTES) {
        toast({
          title: "Attachments too large",
          description: `"${file.name}" would exceed the ${formatFileSize(MAX_TOTAL_FILE_BYTES)} total limit.`,
          variant: "destructive",
        });
        continue;
      }

      knownNames.add(file.name);
      totalCount += 1;
      totalBytes += file.size;
      additions.push({
        id: createFileId(),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      });
    }

    if (additions.length > 0) {
      setFiles((prev) => [...prev, ...additions]);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const body = new FormData();
    body.append("name", formData.name.trim());
    body.append("email", formData.email.trim());
    body.append("phone", formData.phone.trim());
    body.append("subject", formData.subject.trim());
    body.append("message", formData.message.trim());
    body.append("honeypot", honeypot);
    if (turnstileToken) {
      body.append("turnstileToken", turnstileToken);
    }
    files.forEach(({ file }) => {
      body.append("files", file, file.name);
    });

    try {
      const response = await fetch(CONTACT_API_ENDPOINT, { method: "POST", body });
      const data: unknown = await response.json().catch(() => null);

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll respond within 24 hours.",
        });
        setFormData(emptyFormData);
        setHoneypot("");
        setFiles([]);
        setTurnstileToken("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        if (turnstileWidgetIdRef.current !== null) {
          window.turnstile?.reset(turnstileWidgetIdRef.current);
        }
        setSubmitStatus("success");
        return;
      }

      const serverMessage = extractApiErrorMessage(data);
      const fallbackMessage =
        response.status === 429
          ? "Too many submissions. Please try again later."
          : response.status === 413
            ? "Files are too large. Keep attachments under 10 MB."
            : "Failed to send your message. Please try again.";

      toast({
        title: "Failed to send message",
        description: serverMessage ?? fallbackMessage,
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Failed to send message",
        description: "We couldn't reach the server. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
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
                        Your message has been sent successfully. We'll respond within 24 hours.
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
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding? (optional)"
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

                  <Input
                    name="honeypot"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="sr-only"
                  />

                  <div>
                    <Label htmlFor="contact-files">Attachments</Label>
                    <input
                      id="contact-files"
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="sr-only"
                      onChange={handleFilesChange}
                      disabled={submitting}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={submitting}
                    >
                      <Paperclip className="w-4 h-4" />
                      Attach documents (optional)
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Up to {MAX_FILE_COUNT} files, {formatFileSize(MAX_TOTAL_FILE_BYTES)} total — PDF, DOC, DOCX, JPG, PNG
                    </p>
                    <div aria-live="polite" className="mt-3">
                      {files.length > 0 && (
                        <ul className="space-y-2">
                          {files.map((attached) => (
                            <li
                              key={attached.id}
                              className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                              <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden />
                              <span className="flex-1 truncate text-muted-foreground">{attached.name}</span>
                              <span className="text-xs text-muted-foreground flex-shrink-0">
                                {formatFileSize(attached.size)}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label="Remove file"
                                disabled={submitting}
                                onClick={() => removeFile(attached.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {TURNSTILE_SITE_KEY && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Security check</Label>
                      <div ref={turnstileContainerRef} className="mt-2" />
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full btn-glow" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
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