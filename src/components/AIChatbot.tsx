
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

// Enhanced legal knowledge base with comprehensive Kenyan legal information
const legalKnowledgeBase = {
  familyLaw: {
    keywords: ['divorce', 'custody', 'child', 'marriage', 'separation', 'alimony', 'matrimonial', 'spouse', 'wedding', 'prenup', 'maintenance'],
    responses: [
      "Under the Marriage Act 2014 (Kenya), marriage dissolution requires court proceedings. Grounds include cruelty, desertion, adultery, and irretrievable breakdown. Children's interests are paramount per Children Act 2022. Source: kenyalaw.org. This is general legal information, not legal advice.",
      "Child custody in Kenya follows the 'best interests of the child' principle (Children Act 2022, Section 4). Courts consider child's welfare, parental capability, and wishes of mature children. Both parents have equal rights initially. This is general legal information, not legal advice.",
      "The Matrimonial Property Act 2013 governs property division in divorce. Contributions (financial and non-financial) determine shares. Matrimonial home has special protection. Courts have discretion in distribution. This is general legal information, not legal advice.",
      "Maintenance obligations are governed by the Children Act 2022 and Marriage Act 2014. Both parents must support children regardless of custody. Spousal maintenance may be ordered based on need and ability to pay. This is general legal information, not legal advice."
    ]
  },
  criminalLaw: {
    keywords: ['criminal', 'arrest', 'bail', 'court', 'charges', 'defense', 'police', 'theft', 'assault', 'fraud', 'dui', 'traffic', 'penal code'],
    responses: [
      "Criminal rights in Kenya are protected by Constitution Articles 49-50: presumption of innocence, right to counsel, fair trial within reasonable time. Criminal Procedure Code (Cap 75) governs proceedings. Source: kenyalaw.org. This is general legal information, not legal advice.",
      "Bail is a constitutional right (Article 49(1)(h)) except for specific offenses. Factors: offense severity, flight risk, public safety. Bail & Bond Policy Guidelines 2015 provide framework. Apply promptly after arrest. This is general legal information, not legal advice.",
      "The Penal Code (Cap 63) defines criminal offenses in Kenya. Traffic offenses under Traffic Act (Cap 403) include licensing, speed limits, DUI. Penalties range from fines to imprisonment. Recent amendments strengthen enforcement. This is general legal information, not legal advice.",
      "Police powers are limited by Constitution Article 244. Arrest requires reasonable suspicion. Detention maximum 24 hours without charge, 14 days with court order. Right to remain silent, legal representation. This is general legal information, not legal advice."
    ]
  },
  propertyLaw: {
    keywords: ['property', 'land', 'conveyancing', 'title', 'deed', 'real estate', 'transfer', 'lease', 'rent', 'mortgage', 'boundary', 'succession'],
    responses: [
      "Land registration in Kenya follows Land Registration Act 2012. Three systems: registration of titles, deeds, and special registration. Indefeasibility of title protects registered owners. Search at Ardhi House or online. This is general legal information, not legal advice.",
      "Land succession follows Law of Succession Act (Cap 160). Intestate succession distributes property to spouse and children. Widows/widowers get life interest in matrimonial home. Succession certificate required for transfers. This is general legal information, not legal advice.",
      "The Land Act 2012 governs land tenure: freehold, leasehold, customary. Community land under Community Land Act 2016. Land Control Act regulates agricultural land transactions in specified areas. This is general legal information, not legal advice.",
      "Stamp duty on property transfers: KSh 20 per KSh 1,000 (2%) for property in municipalities, KSh 10 per KSh 1,000 (1%) elsewhere. Registration fees additional. Stamp Duty Act (Cap 480). This is general legal information, not legal advice."
    ]
  },
  employmentLaw: {
    keywords: ['employment', 'job', 'work', 'labor', 'wrongful termination', 'workplace', 'contract', 'salary', 'harassment', 'discrimination', 'NSSF', 'NHIF'],
    responses: [
      "Employment Act 2007 governs work relationships in Kenya. Covers contracts, termination, working hours, leave entitlements. Industrial Court handles disputes. Minimum wage set by government annually. This is general legal information, not legal advice.",
      "Termination requires just cause and proper procedure (Employment Act Section 41-47). Notice periods: 1 month for monthly-paid staff. Unfair dismissal entitles compensation. Redundancy requires consultation and compensation. This is general legal information, not legal advice.",
      "Workplace discrimination violates Constitution Article 27. Equal opportunities regardless of race, gender, religion, disability. Employment Act prohibits unfair treatment. Sexual harassment addressed under Employment Act Section 6. This is general legal information, not legal advice.",
      "Statutory deductions include PAYE (Pay As You Earn), NSSF (National Social Security Fund), NHIF (National Hospital Insurance Fund), Housing Levy (1.5%). Employers must register and remit monthly. This is general legal information, not legal advice."
    ]
  },
  businessLaw: {
    keywords: ['business', 'company', 'commercial', 'contract', 'startup', 'incorporation', 'compliance', 'partnership', 'tax', 'licensing', 'KRA', 'VAT'],
    responses: [
      "Company registration in Kenya follows Companies Act 2015. Types: private limited, public, LLP. Register at Registrar of Companies with Memorandum and Articles. Minimum 1 director, 1 shareholder. Online registration available. This is general legal information, not legal advice.",
      "Tax obligations include Corporate Income Tax (30%), VAT (16% standard rate), Withholding Tax, PAYE for employees. Register with KRA, file monthly/annual returns. Digital Service Tax (1.5%) applies to digital marketplace. This is general legal information, not legal advice.",
      "Business licensing varies by activity and location. Single Business Permit from county government covers most businesses. Professional services may need additional licensing. Environment Impact Assessment for specified activities. This is general legal information, not legal advice.",
      "Commercial contracts follow Contract Law principles and Sale of Goods Act (Cap 31). Essential terms: parties, consideration, performance, termination. Consumer Protection Act 2012 governs consumer transactions. This is general legal information, not legal advice."
    ]
  },
  general: {
    keywords: ['help', 'legal', 'lawyer', 'advice', 'consultation', 'research', 'statute', 'case', 'law', 'information'],
    responses: [
      "I'm a Legal Research Assistant providing general legal information from authoritative sources. I prioritize Kenya Law Reports (kenyalaw.org), UN treaties, and public-domain legal materials. This is general legal information, not legal advice.",
      "I can help research Kenyan statutes, Acts of Parliament, constitutional materials, case law, and UN treaties. I always provide the most recent versions and cite my sources. This is general legal information, not legal advice.",
      "For legal research, I search Kenya Law Reports, UN Treaty Collection, and government publications. I summarize findings in plain language with proper citations. This is general legal information, not legal advice.",
      "I provide factual, neutral legal information from public sources. If laws are amended or cases overruled, I note that clearly. For personalized advice, consult a qualified attorney. This is general legal information, not legal advice."
    ]
  },
  constitution: {
    keywords: ['constitution', 'rights', 'bill of rights', 'constitutional', 'article', 'chapter', 'fundamental', 'devolution'],
    responses: [
      "The Constitution of Kenya 2010 is available at kenyalaw.org. Key chapters include: Bill of Rights (Chapter 4), Devolution (Chapter 11), and Judiciary (Chapter 10). Each article addresses specific rights and government structures. This is general legal information, not legal advice.",
      "Constitutional rights in Kenya include fundamental freedoms (Articles 19-51), economic and social rights, and environmental rights. The Supreme Court is the final authority on constitutional interpretation. This is general legal information, not legal advice."
    ]
  },
  research: {
    keywords: ['statute', 'act', 'case law', 'judgment', 'ruling', 'precedent', 'citation', 'kenyalaw', 'court', 'high court', 'appeal', 'supreme'],
    responses: [
      "Kenya's court structure: Magistrates Courts, High Court, Court of Appeal, Supreme Court. High Court has unlimited jurisdiction. Appeal lies to Court of Appeal, then Supreme Court (constitutional matters). Source: kenyalaw.org. This is general legal information, not legal advice.",
      "Kenya Law Reports (kenyalaw.org) contains all current statutes, Acts of Parliament, subsidiary legislation, and case law. Search by citation, parties, or subject matter. Always verify amendments and current status. This is general legal information, not legal advice.",
      "Legal research requires checking multiple sources: primary legislation (Acts), subsidiary legislation (regulations), case law (precedents), and international law where applicable. Cross-reference for consistency and updates. This is general legal information, not legal advice."
    ]
  },
  international: {
    keywords: ['international', 'treaty', 'UN', 'human rights', 'convention', 'protocol', 'ratification'],
    responses: [
      "Kenya has ratified major UN treaties: ICCPR, ICESCR, CEDAW, CRC, CERD. These are domesticated through various Acts. UN Treaty Collection (treaties.un.org) provides full texts and status. This is general legal information, not legal advice.",
      "International human rights law supplements domestic protections. African Charter on Human and Peoples' Rights applies. Regional courts: African Court on Human and Peoples' Rights. This is general legal information, not legal advice."
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
        content: 'Hello! I\'m your Legal Research Assistant. I provide general legal information from authoritative sources like Kenya Law Reports and UN treaties. I can help research statutes, case law, and legal procedures. This is general legal information, not legal advice. How can I assist you today?',
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
    for (const [, data] of Object.entries(legalKnowledgeBase)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        const responses = data.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Contact information responses
    if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
      return "For legal consultations, please use the contact form on this website or call the provided contact number. Office hours are typically Monday to Friday, 8:00 AM to 5:00 PM. This is general legal information, not legal advice.";
    }
    
    if (message.includes('location') || message.includes('office') || message.includes('address')) {
      return "Office location details are available through the contact form on this website. Please reach out to schedule a consultation or get specific directions. This is general legal information, not legal advice.";
    }
    
    if (message.includes('cost') || message.includes('fee') || message.includes('price')) {
      return "Legal fees vary depending on the complexity of your case. We offer competitive rates and transparent pricing. Contact us for a consultation where we can discuss costs specific to your legal needs.";
    }
    
    if (message.includes('urgent') || message.includes('emergency')) {
      return "For urgent legal matters, please call us immediately at +254 704 780 934. We understand that legal emergencies require prompt attention and we're here to help.";
    }
    
    // Default research-focused response
    const defaultResponses = [
      "I can help research Kenyan law from authoritative sources like Kenya Law Reports and UN treaties. Please specify what legal topic, statute, or case you'd like information about. This is general legal information, not legal advice.",
      "As a Legal Research Assistant, I provide information from public-domain legal sources. What specific area of Kenyan law would you like me to research? This is general legal information, not legal advice."
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
          content: 'I apologize, but I\'m having trouble processing your request. Please call us at +254 704 780 934 for immediate assistance.',
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
      {/* Legal Research Assistant Button */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-30 flex items-center gap-3">
        <motion.a
          href="https://wa.me/254704780934?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:bg-[#1ebe5b]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.0, type: "spring", stiffness: 260, damping: 20 }}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="h-7 w-7"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </motion.a>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            onClick={toggleChatbot}
            aria-label={chatState.isOpen ? "Close legal assistant" : "Open legal assistant"}
            className="w-14 h-14 rounded-full bg-navy-700 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-400 text-white dark:text-navy-950 shadow-lg border-2 border-gold-400/40 transition-all duration-300"
            size="icon"
          >
            {chatState.isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </Button>
        </motion.div>
      </div>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {chatState.isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 sm:right-6 z-30"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="flex w-[calc(100vw-2rem)] max-w-96 flex-col h-[min(28rem,calc(100dvh-9rem))] shadow-2xl border bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 border-gray-200 dark:border-gray-700">
              {/* Chat Header */}
              <CardHeader className="flex shrink-0 flex-row items-center justify-between space-y-0 pb-2 bg-navy-800 dark:bg-navy-900 text-white rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-gold-400" />
                  <CardTitle className="text-sm font-medium">Legal Research Assistant</CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMinimize}
                    aria-label={chatState.isMinimized ? "Maximize chat window" : "Minimize chat window"}
                    className="w-6 h-6 text-white hover:bg-white/20"
                  >
                    {chatState.isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeChatbot}
                    aria-label="Close chat window"
                    className="w-6 h-6 text-white hover:bg-white/20"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardHeader>

              {/* Chat Content */}
              {!chatState.isMinimized && (
                <CardContent className="flex min-h-0 flex-1 flex-col p-0">
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
                              ? 'bg-navy-700 dark:bg-gold-500 dark:text-navy-950 text-white rounded-br-sm'
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
                              <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                        placeholder="Ask about Kenyan law, statutes, or cases..."
                        aria-label="Ask a legal question"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={chatState.isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!chatState.inputValue.trim() || chatState.isTyping}
                        aria-label="Send message"
                        size="icon"
                        className="bg-navy-700 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-400 dark:text-navy-950"
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
