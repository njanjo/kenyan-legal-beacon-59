
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
  emergencyContact: z.string().min(10, "Emergency contact is required"),
});

const powerOfAttorneySchema = z.object({
  principalName: z.string().min(2, "Principal name is required"),
  principalId: z.string().min(6, "Principal ID is required"),
  agentName: z.string().min(2, "Agent name is required"),
  agentId: z.string().min(6, "Agent ID is required"),
  powers: z.string().min(10, "Please specify the powers granted"),
  duration: z.string().min(1, "Duration is required").optional(),
  witnessName: z.string().min(2, "Witness name is required"),
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
      const { height } = page.getSize();
      const fontSize = 12;
      const titleFontSize = 18;
      
      // Add title
      page.drawText(`${documentType.toUpperCase()} FORM`, {
        x: 50,
        y: height - 50,
        size: titleFontSize,
        color: rgb(0, 0.2, 0.6),
      });
      
      // Add form data
      let yPosition = height - 100;
      Object.entries(formData).forEach(([key, value]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        page.drawText(`${label}: ${value}`, {
          x: 50,
          y: yPosition,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        yPosition -= 25;
      });
      
      // Add footer
      page.drawText('Generated by Mwaura Muroki Associates & Advocates', {
        x: 50,
        y: 50,
        size: 10,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      // Generate PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // Download PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = `${documentType}-form-${Date.now()}.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
      toast.success("PDF generated and downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStaticDownload = (filename: string) => {
    // For static documents like Constitution
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKCR7filename}`;
    link.download = `${filename}.pdf`;
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
                name="powers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyan-300">Powers Granted</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-gray-800/50 border-cyan-500/30 text-white" />
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
                        onClick={() => handleStaticDownload(doc.title)}
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
                          onClick={() => handleStaticDownload(doc.title)}
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
