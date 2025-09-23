import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const WhatsAppButton = () => {
  const phoneNumber = "254704780934";
  const message = "Hello! I would like to inquire about your legal services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Opening WhatsApp...",
      description: "You will be redirected to WhatsApp chat.",
    });
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1
      }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* WhatsApp tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
          <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      </motion.a>
      
      {/* Pulse ring animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500 opacity-20"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default WhatsAppButton;