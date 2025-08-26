
import { useState, useCallback } from 'react';

// Enhanced type definitions for better developer understanding
export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatbotConfig {
  welcomeMessage: string;
  apiEndpoint?: string;
  maxMessages?: number;
  typingDelay?: number;
}

export interface UseChatbotReturn {
  // State
  messages: ChatMessage[];
  isOpen: boolean;
  isMinimized: boolean;
  isTyping: boolean;
  inputValue: string;
  
  // Actions
  toggleChatbot: () => void;
  toggleMinimize: () => void;
  closeChatbot: () => void;
  sendMessage: (content: string) => Promise<void>;
  setInputValue: (value: string) => void;
  clearMessages: () => void;
}

// Custom hook for managing chatbot state and logic
export const useChatbot = (config: ChatbotConfig = { welcomeMessage: 'Hello! How can I help you today?' }): UseChatbotReturn => {
  // Core chatbot state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: config.welcomeMessage,
      timestamp: new Date()
    }
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Toggle chatbot visibility
  const toggleChatbot = useCallback(() => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  }, []);

  // Toggle minimize/maximize state
  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  // Close chatbot completely
  const closeChatbot = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: config.welcomeMessage,
        timestamp: new Date()
      }
    ]);
  }, [config.welcomeMessage]);

  // AI response generation with proper error handling
  const generateAIResponse = useCallback(async (userMessage: string): Promise<string> => {
    // Simulate realistic typing delay
    const delay = config.typingDelay || (1000 + Math.random() * 2000);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Legal-focused response templates
    const legalResponses = [
      `Thank you for your question about "${userMessage.toLowerCase()}". I'd be happy to provide some initial guidance. For detailed legal advice, I recommend scheduling a consultation with our team.`,
      "That's an important legal matter. Our experienced attorneys can help you navigate this situation. Would you like me to connect you with the right specialist?",
      "I understand your concern. Legal matters can be complex, and it's important to get proper guidance. You can reach us at 0704780934 for a consultation.",
      "Based on your inquiry, this falls under one of our areas of expertise. Our legal team has extensive experience with similar cases. Let me help you get started.",
      "Thank you for contacting us. This type of legal issue requires careful consideration. I recommend speaking directly with one of our attorneys who can provide personalized advice."
    ];
    
    // Simple keyword-based response selection (can be enhanced with actual AI)
    const keywords = userMessage.toLowerCase();
    if (keywords.includes('family') || keywords.includes('divorce') || keywords.includes('custody')) {
      return "Family law matters require sensitive handling. Our family law specialists can help with divorce proceedings, child custody, and related issues. Call 0704780934 to schedule a consultation.";
    } else if (keywords.includes('criminal') || keywords.includes('bail') || keywords.includes('arrest')) {
      return "Criminal law cases are time-sensitive. Our criminal defense team is available to help with bail applications, defense strategies, and court representation. Contact us immediately at 0704780934.";
    } else if (keywords.includes('property') || keywords.includes('land') || keywords.includes('real estate')) {
      return "Property and conveyancing matters are our specialty. We handle property transfers, land disputes, and real estate transactions. Let's discuss your specific situation.";
    }
    
    return legalResponses[Math.floor(Math.random() * legalResponses.length)];
  }, [config.typingDelay]);

  // Send message function with comprehensive error handling
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    // Add user message to state
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(content);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I apologize, but I'm having trouble responding right now. Please call us directly at 0704780934 for immediate assistance.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [generateAIResponse]);

  return {
    // State
    messages,
    isOpen,
    isMinimized,
    isTyping,
    inputValue,
    
    // Actions
    toggleChatbot,
    toggleMinimize,
    closeChatbot,
    sendMessage,
    setInputValue,
    clearMessages
  };
};
