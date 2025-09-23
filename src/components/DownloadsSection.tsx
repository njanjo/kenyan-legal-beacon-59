
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Download, FileText, Edit3, Send, MessageCircle, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
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

type ConsultationFormData = z.infer<typeof consultationFormSchema>;
type ClientInfoFormData = z.infer<typeof clientInfoSchema>;
type PowerOfAttorneyFormData = z.infer<typeof powerOfAttorneySchema>;

const DownloadsSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const documents = [
    {
      id: "constitution",
      title: "Constitution of Kenya 2010",
      description: "The supreme law of the Republic of Kenya",
      size: "2.1 MB",
      type: "Reference Document",
      category: "constitutional",
      downloadOnly: true,
      filename: "Kenya-Constitution-2010",
      gradient: "from-blue-500/20 to-cyan-500/20",
      glowColor: "shadow-blue-500/20"
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
      gradient: "from-green-500/20 to-emerald-500/20",
      glowColor: "shadow-green-500/20"
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
      gradient: "from-purple-500/20 to-pink-500/20",
      glowColor: "shadow-purple-500/20"
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
      gradient: "from-orange-500/20 to-red-500/20",
      glowColor: "shadow-orange-500/20"
    }
  ];

  const generatePDF = async (formData: any, documentType: string) => {
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
      yPosition -= 30;
      page.drawText('SIGNATURES:', {
        x: 50,
        y: yPosition,
        size: headerFontSize,
        color: rgb(0.2, 0.2, 0.6),
      });
      
      yPosition -= 40;
      page.drawText('Client Signature: ________________________    Date: ______________', {
        x: 50,
        y: yPosition,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      
      yPosition -= 30;
      page.drawText('Witness Signature: _______________________    Date: ______________', {
        x: 50,
        y: yPosition,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      
      // Professional footer with enhanced design
      page.drawLine({
        start: { x: 50, y: 100 },
        end: { x: width - 50, y: 100 },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });
      
      page.drawText('IMPORTANT LEGAL NOTICE', {
        x: 50,
        y: 85,
        size: 10,
        color: rgb(0.7, 0.2, 0.2),
      });
      
      page.drawText('This document was generated electronically and requires proper signatures to be legally binding.', {
        x: 50,
        y: 70,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      page.drawText('For legal advice and consultation, please contact our office immediately.', {
        x: 50,
        y: 55,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      page.drawText('© 2024 Mwaura Muroki Associates & Advocates - All Rights Reserved', {
        x: 50,
        y: 30,
        size: 8,
        color: rgb(0.6, 0.6, 0.6),
      });
      
      // Professional stamp placeholder
      page.drawRectangle({
        x: width - 150,
        y: 120,
        width: 100,
        height: 60,
        borderColor: rgb(0.7, 0.7, 0.7),
        borderWidth: 1,
      });
      
      page.drawText('OFFICIAL SEAL', {
        x: width - 135,
        y: 155,
        size: 8,
        color: rgb(0.6, 0.6, 0.6),
      });
      
      page.drawText('& SIGNATURE', {
        x: width - 135,
        y: 145,
        size: 8,
        color: rgb(0.6, 0.6, 0.6),
      });
      
      // Generate PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
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

  const handleStaticDownload = (doc: any) => {
    // For static documents like Constitution and templates
    const link = document.createElement('a');
    link.href = `/documents/${doc.filename}.pdf`;
    link.download = `${doc.filename}.pdf`;
    link.target = '_blank';
    link.click();
    toast.success("Document downloaded successfully!");
  };

  const FormComponent = ({ document, onSubmit }: { document: any, onSubmit: (data: any) => void }) => {
    const form = useForm<any>({
      resolver: zodResolver(document.schema),
      defaultValues: {},
    });

    const handleSubmit = (data: any) => {
      onSubmit(data);
      form.reset();
      setActiveForm(null);
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
                    <FormLabel className="text-cyan-300">Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Legal Matter Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Preferred Consultation Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">ID Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Occupation</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Employer</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Emergency Contact Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Emergency Contact Phone</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Relationship</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Principal Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Principal ID Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Principal Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Agent Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Agent ID Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Agent Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Powers Granted</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" placeholder="Describe the specific powers being granted to the agent..." />
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
                    <FormLabel className="text-cyan-300">Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Witness Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                    <FormLabel className="text-cyan-300">Witness ID Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
              onClick={() => setActiveForm(null)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isGenerating}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
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
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-900 to-black min-h-screen relative overflow-hidden">
      {/* Futuristic background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
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
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Interactive Legal Forms
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of legal documentation with our AI-powered interactive forms. 
              Fill, generate, and download professional PDFs instantly.
            </p>
            <div className="flex items-center justify-center mt-4 gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-medium">Powered by Advanced PDF Technology</span>
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
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
              className="group"
            >
              <Card className={`relative overflow-hidden transition-all duration-500 hover:scale-105 bg-gradient-to-br ${doc.gradient} backdrop-blur-sm border-gray-700/50 hover:border-cyan-500/50 hover:${doc.glowColor} group-hover:shadow-2xl`}>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 group-hover:scale-110 transform" />
                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${doc.gradient} border border-cyan-500/30`}>
                      {doc.type}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-300 transition-colors duration-300">
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
                    <span className="text-sm text-cyan-400 font-medium">
                      {doc.size}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {doc.downloadOnly ? (
                      <Button 
                        onClick={() => handleStaticDownload(doc)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-none shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    ) : (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              onClick={() => setActiveForm(doc.id)}
                              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group-hover:scale-105"
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Fill Online
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900/95 backdrop-blur-lg border-gray-700/50">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
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
                          className="w-full border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300"
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
          className="text-center mt-16 p-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Help with Your Forms?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our legal experts are available to assist you with filling out any forms or answering questions about legal documentation.
          </p>
          <Button asChild className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-3 rounded-full">
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
