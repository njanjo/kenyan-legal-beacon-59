
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

const DownloadsSection = () => {
  const downloads = [
    {
      title: "Constitution of Kenya 2010",
      description: "The supreme law of the Republic of Kenya",
      size: "2.1 MB",
      type: "PDF"
    },
    {
      title: "Legal Consultation Form",
      description: "Fill out this form before your consultation",
      size: "156 KB",
      type: "PDF"
    },
    {
      title: "Client Information Sheet",
      description: "Provide your details for legal representation",
      size: "89 KB", 
      type: "PDF"
    },
    {
      title: "Power of Attorney Form",
      description: "Standard power of attorney template",
      size: "201 KB",
      type: "PDF"
    }
  ];

  const handleDownload = (filename: string) => {
    // Create a dummy PDF download - in production, these would be actual PDF files
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKCR7filename}`;
    link.download = `${filename}.pdf`;
    link.click();
  };

  return (
    <section className="py-16 bg-background dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 dark:text-white">Legal Documents & Forms</h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            Download essential legal documents and forms for your convenience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {downloads.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                  <CardTitle className="text-lg dark:text-white">{item.title}</CardTitle>
                  <CardDescription className="dark:text-gray-400">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground dark:text-gray-400">{item.type}</span>
                    <span className="text-sm text-muted-foreground dark:text-gray-400">{item.size}</span>
                  </div>
                  <Button 
                    onClick={() => handleDownload(item.title)}
                    className="w-full dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
