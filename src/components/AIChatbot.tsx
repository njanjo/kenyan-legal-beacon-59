
import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatbotState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: ChatMessage[];
  inputValue: string;
  isTyping: boolean;
}

// Enhanced legal knowledge base for better responses
const legalKnowledgeBase = {
  familyLaw: {
    keywords: ['divorce', 'custody', 'child', 'marriage', 'separation', 'alimony', 'matrimonial'],
    responses: [
      "Family law matters require sensitive handling. Our team specializes in divorce proceedings, child custody arrangements, and matrimonial disputes. We ensure your family's interests are protected while seeking amicable solutions.",
      "Child custody cases need careful attention to the child's best interests. We can help you navigate custody arrangements, visitation rights, and support obligations under Kenyan law.",
      "Divorce proceedings can be complex. We handle contested and uncontested divorces, property division, and spousal support matters with discretion and professionalism."
    ]
  },
  criminalLaw: {
    keywords: ['criminal', 'arrest', 'bail', 'court', 'charges', 'defense', 'police'],
    responses: [
      "If you're facing criminal charges, it's crucial to have experienced legal representation. We provide robust criminal defense services including bail applications and court representation.",
      "Your rights are protected under Kenyan law. We can help with police interrogations, court appearances, and building a strong defense strategy for your case.",
      "Bail applications require urgent attention. Contact us immediately at 0796985336 for emergency legal assistance in criminal matters."
    ]
  },
  propertyLaw: {
    keywords: ['property', 'land', 'conveyancing', 'title', 'deed', 'real estate', 'transfer'],
    responses: [
      "Property transactions require proper legal documentation. We handle conveyancing, title transfers, and land dispute resolution to ensure your property rights are secure.",
      "Land disputes can be complex under Kenyan law. Our team has extensive experience in property law and can help resolve boundary disputes and title issues.",
      "Whether buying or selling property, proper conveyancing protects your investment. We ensure all legal requirements are met for smooth property transfers."
    ]
  },
  employmentLaw: {
    keywords: ['employment', 'job', 'work', 'labor', 'wrongful termination', 'workplace', 'contract'],
    responses: [
      "Employment disputes affect your livelihood. We handle wrongful termination cases, contract disputes, and workplace rights violations under Kenyan employment law.",
      "Your workplace rights are protected by law. We can help with employment contracts, disciplinary procedures, and labor dispute resolution.",
      "Whether you're an employer or employee, understanding your rights and obligations is crucial. We provide comprehensive employment law services."
    ]
  },
  businessLaw: {
    keywords: ['business', 'company', 'commercial', 'contract', 'startup', 'incorporation', 'compliance'],
    responses: [
      "Starting a business requires proper legal foundation. We assist with company formation, commercial contracts, and regulatory compliance to protect your business interests.",
      "Commercial disputes can impact your business operations. Our team handles contract disputes, partnership issues, and business litigation efficiently.",
      "Business compliance is essential for sustainable operations. We help ensure your business meets all legal requirements under Kenyan commercial law."
    ]
  },
  general: {
    keywords: ['help', 'legal', 'lawyer', 'advice', 'consultation', 'cost', 'fee'],
    responses: [
      "I'm here to provide initial legal guidance. For detailed advice on your specific situation, I recommend scheduling a consultation with our experienced legal team.",
      "Legal matters vary greatly in complexity. Our team offers personalized consultations to understand your unique situation and provide tailored legal solutions.",
      "Every legal case is unique. Contact us at 0796985336 or visit our office for a comprehensive consultation where we can discuss your specific needs and legal options."
    ]
  }
};

// Enhanced AI Chatbot Assistant Component
const AIChatbot = () => {
  const [chatState, setChatState] = useState<ChatbotState>({
    isOpen: false,
    isMinimized: false,
    messages: [
      {
        id: '1',
        type: 'bot',
        content: 'Hello! I\'m your legal assistant. I can help you with questions about family law, criminal law, property law, employment law, and business law. How can I assist you today?',
        timestamp: new Date()
      }
    ],
    inputValue: '',
    isTyping: false
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Optimized scroll function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, scrollToBottom]);

  useEffect(() => {
    if (chatState.isOpen && !chatState.isMinimized) {
      inputRef.current?.focus();
    }
  }, [chatState.isOpen, chatState.isMinimized]);

  // Enhanced AI response generation with legal knowledge
  const generateIntelligentResponse = useCallback(async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // Simulate realistic typing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    // Find matching legal area
    for (const [area, data] of Object.entries(legalKnowledgeBase)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        const responses = data.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Contact information responses
    if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
      return "You can reach us at 0796985336 for immediate assistance, WhatsApp us, or email drfatush005@gmail.com. Our office is open Monday to Friday, 8 AM to 6 PM.";
    }
    
    if (message.includes('location') || message.includes('office') || message.includes('address')) {
      return "Our law office is conveniently located in Kenya. Please call 0796985336 to schedule a consultation or get specific directions to our office.";
    }
    
    if (message.includes('cost') || message.includes('fee') || message.includes('price')) {
      return "Legal fees vary depending on the complexity of your case. We offer competitive rates and transparent pricing. Contact us for a consultation where we can discuss costs specific to your legal needs.";
    }
    
    if (message.includes('urgent') || message.includes('emergency')) {
      return "For urgent legal matters, please call us immediately at 0796985336. We understand that legal emergencies require prompt attention and we're here to help.";
    }
    
    // Default helpful response
    return legalKnowledgeBase.general.responses[Math.floor(Math.random() * legalKnowledgeBase.general.responses.length)];
  }, []);

  const toggleChatbot = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
      isMinimized: false
    }));
  }, []);

  const toggleMinimize = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isMinimized: !prev.isMinimized
    }));
  }, []);

  const closeChatbot = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isOpen: false,
      isMinimized: false
    }));
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!chatState.inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatState.inputValue,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      inputValue: '',
      isTyping: true
    }));

    try {
      const aiResponse = await generateIntelligentResponse(userMessage.content);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false
      }));
    } catch (error) {
      console.error('Error generating AI response:', error);
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'I apologize, but I\'m having trouble processing your request. Please call us at 0796985336 for immediate assistance.',
          timestamp: new Date()
        }],
        isTyping: false
      }));
    }
  }, [chatState.inputValue, generateIntelligentResponse]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChatState(prev => ({
      ...prev,
      inputValue: e.target.value
    }));
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <>
      {/* Floating Action Button with Enhanced Styling */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={toggleChatbot}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-blue-500"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {chatState.isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="w-80 sm:w-96 h-96 shadow-2xl border-0 bg-white/98 backdrop-blur-sm dark:bg-gray-900/98 border border-gray-200 dark:border-gray-700">
              {/* Chat Header */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <CardTitle className="text-sm font-medium">Legal Assistant</CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMinimize}
                    className="w-6 h-6 text-white hover:bg-white/20"
                  >
                    {chatState.isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeChatbot}
                    className="w-6 h-6 text-white hover:bg-white/20"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardHeader>

              {/* Chat Content */}
              {!chatState.isMinimized && (
                <CardContent className="flex flex-col h-80 p-0">
                  {/* Messages Container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatState.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white rounded-br-sm'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            {message.type === 'bot' ? (
                              <Bot className="w-3 h-3" />
                            ) : (
                              <User className="w-3 h-3" />
                            )}
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Enhanced Typing Indicator */}
                    {chatState.isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-bl-sm border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-3 h-3" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Enhanced Input Area */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={chatState.inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about legal services..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={chatState.isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!chatState.inputValue.trim() || chatState.isTyping}
                        size="icon"
                        className="bg-blue-600 hover:bg-blue-700 border border-blue-500"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
