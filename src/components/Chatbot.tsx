import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from '../services/chatbot';
import { ChatMarkdown } from '../utils/chatMarkdown';
// import { useChatbot } from '../hooks/useChatbot'; // Removed since data is pre-loaded

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I’m Mikawi’s portfolio assistant. I answer only from his verified projects, skills, education, experience, and GitHub activity. What would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Remove chatbot initialization dependency since data is pre-loaded
  // const { isInitialized, documentsProcessed } = useChatbot();

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' });
  };

  useEffect(() => {
    if (!isOpen) return;
    const id = window.setTimeout(() => scrollToBottom(isLoading ? 'auto' : 'smooth'), 50);
    return () => window.clearTimeout(id);
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const data = await sendChatMessage(
        inputMessage,
        messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        conversationId
      );
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again later.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };



  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 ${className}`}>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-primary-foreground/10"
            aria-label="Chat with Mikawi"
          >
            <MessageCircle size={24} className="animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.9, rotateX: 15 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border w-80 sm:w-96 h-[calc(100vh-6rem)] max-h-[36rem] flex flex-col overflow-hidden mb-4 ml-0 sm:ml-4"
            style={{
              background: 'linear-gradient(135deg, hsl(36 33% 98% / 0.95) 0%, hsl(38 38% 94% / 0.95) 100%)',
              ...(document.documentElement.classList.contains('dark') && {
                background: 'linear-gradient(135deg, hsl(24 9% 13% / 0.95) 0%, hsl(24 10% 9% / 0.95) 100%)'
              })
            }}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-foreground/10 animate-pulse"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Mikawi’s AI Assistant</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Verified portfolio answers
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 relative z-10 group"
                aria-label="Close chat"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>



            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent/20 text-accent-foreground border border-border'
                    }`}>
                      {message.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`rounded-2xl p-3 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent/15 dark:bg-accent/25 text-foreground border border-border'
                    }`}>
                      {message.role === 'assistant' ? (
                        <ChatMarkdown content={message.content} />
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      )}
                      <p className={`text-xs mt-1 opacity-70`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 text-muted-foreground flex items-center justify-center">
                      <Bot size={12} />
                    </div>
                    <div className="bg-accent/15 dark:bg-accent/25 rounded-2xl p-3 border border-border shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Loader2 size={16} className="animate-spin text-primary" />
                          <div className="absolute inset-0 animate-ping">
                            <Loader2 size={16} className="text-primary opacity-30" />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">Checking Mikawi’s portfolio...</span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-2 shrink-0" />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4 bg-card/60 backdrop-blur-sm">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    maxLength={1200}
                    placeholder="Ask Mikawi about his projects, skills, or experience..."
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60 focus:border-primary backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md"
                    disabled={isLoading}
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  )}
                </div>
                <motion.button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-2xl p-3 transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-sm backdrop-blur-sm border border-primary-foreground/10"
                  aria-label="Send message"
                >
                  <Send size={16} className={isLoading ? 'animate-pulse' : ''} />
                </motion.button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Answers only from Mikawi’s verified portfolio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;