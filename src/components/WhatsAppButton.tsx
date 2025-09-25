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
      className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        
        {/* Enhanced WhatsApp tooltip with responsive positioning */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 sm:right-20 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Chat on WhatsApp</span>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-gray-700"></div>
        </div>
      </motion.a>
      
      {/* Enhanced pulse ring animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500 opacity-20"
        animate={{
          scale: [1, 2.2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-400 opacity-10"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </motion.div>
  );
};

export default WhatsAppButton;