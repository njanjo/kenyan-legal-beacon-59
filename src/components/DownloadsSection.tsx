
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Download, FileText, Edit3, MessageCircle, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Form schemas for different document types
const consultationFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  legalMatter: z.string().min(10, "Please describe your legal matter"),
  preferredDate: z.string().min(1, "Preferred consultation date is required"),
  urgency: z.enum(["Low", "Medium", "High"]).optional(),
});

const clientInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  idNumber: z.string().min(6, "ID number is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Complete address is required"),
  occupation: z.string().min(2, "Occupation is required"),
  employer: z.string().min(2, "Employer is required"),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(10, "Emergency contact phone is required"),
  emergencyContactRelationship: z.string().min(2, "Relationship is required"),
});

const powerOfAttorneySchema = z.object({
  principalName: z.string().min(2, "Principal name is required"),
  principalId: z.string().min(6, "Principal ID is required"),
  principalAddress: z.string().min(5, "Principal address is required"),
  agentName: z.string().min(2, "Agent name is required"),
  agentId: z.string().min(6, "Agent ID is required"),
  agentAddress: z.string().min(5, "Agent address is required"),
  powers: z.string().min(10, "Please specify the powers granted"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  witnessName: z.string().min(2, "Witness name is required"),
  witnessId: z.string().min(6, "Witness ID is required"),
});

type DocumentItem = {
  id: string;
  title: string;
  description: string;
  size: string;
  type: string;
  category: string;
  downloadOnly?: boolean;
  filename: string;
  gradient: string;
  schema?: z.ZodType;
};

const DownloadsSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const documents: DocumentItem[] = [
    {
      id: "constitution",
      title: "Constitution of Kenya 2010",
      description: "The supreme law of the Republic of Kenya",
      size: "2.1 MB",
      type: "Reference Document",
      category: "constitutional",
      downloadOnly: true,
      filename: "Kenya-Constitution-2010",
      gradient: "from-navy-700/40 to-navy-800/40"
    },
    {
      id: "consultation",
      title: "Legal Consultation Form",
      description: "Fill out this form before your consultation",
      size: "Interactive",
      type: "Fillable Form",
      category: "consultation",
      schema: consultationFormSchema,
      filename: "legal-consultation-form-template",
      gradient: "from-gold-500/20 to-gold-600/10"
    },
    {
      id: "clientinfo",
      title: "Client Information Sheet",
      description: "Provide your details for legal representation",
      size: "Interactive",
      type: "Fillable Form",
      category: "client",
      schema: clientInfoSchema,
      filename: "client-information-sheet-template",
      gradient: "from-navy-800/40 to-navy-700/40"
    },
    {
      id: "powerattorney",
      title: "Power of Attorney Form",
      description: "Standard power of attorney template",
      size: "Interactive",
      type: "Fillable Form",
      category: "legal",
      schema: powerOfAttorneySchema,
      filename: "power-of-attorney-template",
      gradient: "from-gold-600/20 to-gold-500/10"
    }
  ];

  const generatePDF = async (formData: Record<string, unknown>, documentType: string) => {
    setIsGenerating(true);
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([612, 792]); // US Letter size
      const { height, width } = page.getSize();
      const fontSize = 11;
      const titleFontSize = 16;
      const headerFontSize = 14;
      
      // Professional letterhead with enhanced design
      // Main company name with larger font
      page.drawText('MWAURA MUROKI ASSOCIATES & ADVOCATES', {
        x: 50,
        y: height - 30,
        size: 18,
        color: rgb(0.05, 0.15, 0.5),
      });
      
      // Subtitle
      page.drawText('Advocates & Commissioners for Oaths', {
        x: 50,
        y: height - 50,
        size: 12,
        color: rgb(0.2, 0.3, 0.7),
      });
      
      // Contact information with better formatting
      page.drawText('Office: Equity Plaza Commercial Street, 4th Floor Wing B Room 420, Thika', {
        x: 50,
        y: height - 70,
        size: 9,
        color: rgb(0.4, 0.4, 0.4),
      });
      
      page.drawText('Tel: +254 704 780 934 | Email: mwauramurokiadvocates@gmail.com', {
        x: 50,
        y: height - 85,
        size: 9,
        color: rgb(0.4, 0.4, 0.4),
      });
      
      // Professional border design
      page.drawRectangle({
        x: 40,
        y: height - 100,
        width: width - 80,
        height: 3,
        color: rgb(0.05, 0.15, 0.5),
      });
      
      // Watermark effect (simplified to avoid TypeScript issues)
      page.drawText('CONFIDENTIAL LEGAL DOCUMENT', {
        x: width / 2 - 120,
        y: height / 2,
        size: 35,
        color: rgb(0.92, 0.92, 0.92),
      });
      
      // Add title
      page.drawText(`${documentType.toUpperCase()}`, {
        x: 50,
        y: height - 110,
        size: titleFontSize,
        color: rgb(0, 0.2, 0.6),
      });
      
      // Add current date
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      page.drawText(`Date: ${currentDate}`, {
        x: width - 150,
        y: height - 110,
        size: 10,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      // Add form data with better formatting
      let yPosition = height - 150;
      Object.entries(formData).forEach(([key, value]) => {
        // Format field names to be more readable
        const label = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .replace(/Id/g, 'ID')
          .replace(/Email/g, 'Email Address');
        
        // Handle long text fields differently
        if (key === 'legalMatter' || key === 'powers' || key === 'address') {
          page.drawText(`${label}:`, {
            x: 50,
            y: yPosition,
            size: fontSize,
            color: rgb(0.2, 0.2, 0.6),
          });
          yPosition -= 20;
          
          // Split long text into multiple lines
          const maxWidth = 500;
          const words = String(value).split(' ');
          let line = '';
          
          words.forEach((word) => {
            const testLine = line + word + ' ';
            if (testLine.length * 6 > maxWidth) {
              page.drawText(line, {
                x: 70,
                y: yPosition,
                size: fontSize,
                color: rgb(0, 0, 0),
              });
              yPosition -= 18;
              line = word + ' ';
            } else {
              line = testLine;
            }
          });
          
          if (line) {
            page.drawText(line, {
              x: 70,
              y: yPosition,
              size: fontSize,
              color: rgb(0, 0, 0),
            });
            yPosition -= 25;
          }
        } else {
          page.drawText(`${label}: ${value}`, {
            x: 50,
            y: yPosition,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          yPosition -= 20;
        }
        
        // Add some extra space between sections
        if (key === 'phone' || key === 'email' || key === 'agentId') {
          yPosition -= 10;
        }
      });
      
      // Add signature section
      // Guard against overflow: if content reaches the footer area, continue
      // signatures and the stamp on a new page instead of overlapping.
      const footerBoundary = 150;
      let contentPage = page;
      if (yPosition < footerBoundary + 130) {
        contentPage = pdfDoc.addPage([612, 792]);
        const { height: newHeight } = contentPage.getSize();
        contentPage.drawText(`${documentType.toUpperCase()} - Signatures`, {
          x: 50,
          y: newHeight - 60,
          size: headerFontSize,
          color: rgb(0.05, 0.15, 0.5),
        });
        yPosition = newHeight - 100;
      }

      yPosition -= 30;
      contentPage.drawText('SIGNATURES:', {
        x: 50,
        y: yPosition,
        size: headerFontSize,
        color: rgb(0.2, 0.2, 0.6),
      });
      
      yPosition -= 40;
      contentPage.drawText('Client Signature: ________________________    Date: ______________', {
        x: 50,
        y: yPosition,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      
      yPosition -= 30;
      contentPage.drawText('Witness Signature: _______________________    Date: ______________', {
        x: 50,
        y: yPosition,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      
      // Professional footer with enhanced design
      contentPage.drawLine({
        start: { x: 50, y: 100 },
        end: { x: width - 50, y: 100 },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });
      
      contentPage.drawText('IMPORTANT LEGAL NOTICE', {
        x: 50,
        y: 85,
        size: 10,
        color: rgb(0.7, 0.2, 0.2),
      });
      
      contentPage.drawText('This document was generated electronically and requires proper signatures to be legally binding.', {
        x: 50,
        y: 70,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      contentPage.drawText('For legal advice and consultation, please contact our office immediately.', {
        x: 50,
        y: 55,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      contentPage.drawText(`© ${new Date().getFullYear()} Mwaura Muroki Associates & Advocates - All Rights Reserved`, {
        x: 50,
        y: 30,
        size: 8,
        color: rgb(0.6, 0.6, 0.6),
      });
      
      // Professional stamp placeholder
      contentPage.drawRectangle({
        x: width - 150,
        y: 120,
        width: 100,
        height: 60,
        borderColor: rgb(0.7, 0.7, 0.7),
        borderWidth: 1,
      });
      
      contentPage.drawText('OFFICIAL SEAL', {
        x: width - 135,
        y: 155,
        size: 8,
        color: rgb(0.6, 0.6, 0.6),
      });
      
      contentPage.drawText('& SIGNATURE', {
        x: width - 135,
        y: 145,
        size: 8,
        color: rgb(0.6, 0.6, 0.6),
      });
      
      // Generate PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      
      // Download PDF with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      saveAs(blob, `${documentType.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.pdf`);
      
      toast.success("PDF generated and downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStaticDownload = async (doc: DocumentItem) => {
    try {
      const response = await fetch(`/documents/${doc.filename}.pdf`);
      if (!response.ok) {
        throw new Error(`Download failed (${response.status})`);
      }
      const blob = await response.blob();
      saveAs(blob, `${doc.filename}.pdf`);
      toast.success("Document downloaded successfully!");
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error("Download failed. Please try again later or request the document from our office.");
    }
  };

  const FormComponent = ({ document, onSubmit }: { document: DocumentItem, onSubmit: (data: Record<string, unknown>) => void }) => {
    const form = useForm<Record<string, unknown>>({
      resolver: zodResolver(document.schema),
      defaultValues: {},
    });

    const handleSubmit = (data: Record<string, unknown>) => {
      onSubmit(data);
      form.reset();
    };

    const renderFormFields = () => {
      switch (document.id) {
        case 'consultation':
          return (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="legalMatter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Legal Matter Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Preferred Consultation Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          );
        case 'clientinfo':
          return (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">ID Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Occupation</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Employer</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Emergency Contact Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Emergency Contact Phone</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactRelationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Relationship</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          );
        case 'powerattorney':
          return (
            <>
              <FormField
                control={form.control}
                name="principalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Principal Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="principalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Principal ID Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="principalAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Principal Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Agent Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />  
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Agent ID Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Agent Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="powers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Powers Granted</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-white/5 border-gold-500/30 text-white" placeholder="Describe the specific powers being granted to the agent..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="witnessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Witness Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="witnessId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-300">Witness ID Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-gold-500/30 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          );
        default:
          return null;
      }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderFormFields()}
          </div>
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isGenerating}
              className="bg-gradient-to-r from-gold-500 to-blue-500 hover:from-gold-600 hover:to-blue-600 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Generate PDF
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 min-h-screen relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMTkxLCAzNiwgMC4wOCkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-clip-text text-transparent">
              Interactive Legal Forms
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Access essential legal document templates and fillable forms. 
              Complete them online and generate professional PDFs instantly.
            </p>
            <div className="flex items-center justify-center mt-4 gap-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              <span className="text-gold-400 font-medium">Professional Document Technology</span>
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <Card className={`relative h-full overflow-hidden transition-all duration-500 bg-gradient-to-br ${doc.gradient} backdrop-blur-sm border-gray-700/50 hover:border-gold-500/50 group-hover:shadow-2xl`}>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-12 h-12 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${doc.gradient} border border-gold-500/30`}>
                      {doc.type}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-gold-300 transition-colors duration-300">
                    {doc.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {doc.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-400 uppercase font-medium tracking-wide">
                      {doc.category}
                    </span>
                    <span className="text-sm text-gold-400 font-medium">
                      {doc.size}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {doc.downloadOnly ? (
                      <Button 
                        onClick={() => handleStaticDownload(doc)}
                        className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold border-none shadow-lg hover:shadow-gold-500/25 transition-all duration-300"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    ) : (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold border-none shadow-lg hover:shadow-gold-500/25 transition-all duration-300"
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Fill Online
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-navy-950/95 backdrop-blur-lg border-gray-700/50">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                                {doc.title}
                              </DialogTitle>
                            </DialogHeader>
                            <FormComponent 
                              document={doc} 
                              onSubmit={(data) => generatePDF(data, doc.title)}
                            />
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          onClick={() => handleStaticDownload(doc)}
                          variant="outline"
                          className="w-full border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gold-500/50 hover:text-gold-300 transition-all duration-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Template
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-navy-800/50 to-navy-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Help with Your Forms?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our legal experts are available to assist you with filling out any forms or answering questions about legal documentation.
          </p>
          <Button asChild className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-8 py-3 rounded-full">
            <Link to="/contact">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Legal Expert
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadsSection;
