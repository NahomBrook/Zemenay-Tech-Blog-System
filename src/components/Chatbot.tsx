import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { findAnswer } from '@/lib/knowledgeBase';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

type ChatbotConfig = {
  botName?: string;
  initialMessage?: string;
};

export function Chatbot({
  botName = "Zemenay Assistant",
  initialMessage = "Hello! I'm your assistant. How can I help you today?",
}: ChatbotConfig) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    sender: 'bot',
    text: initialMessage,
    timestamp: new Date()
  }]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Find answer in knowledge base
        const answer = findAnswer(input) || 
          "I can answer general questions about Zemenay Tech Blog. For more specific inquiries, please visit our Contact page.";

        // Add bot response
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: answer,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error processing message:', error);
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "I'm sorry, I encountered an error. Please try again or contact us through our Contact page.",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };



  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 p-0 bg-primary hover:bg-primary/90 relative"
          aria-label="Open chat"
        >
          {messages.length > 1 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {messages.length - 1}
            </span>
          )}
          <MessageSquare className="h-6 w-6" />
        </Button>

      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col h-[500px] border border-border/50 overflow-hidden transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-800 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-green-400" />
          <span className="font-semibold">{botName}</span>
        </div>
        <div className="flex items-center space-x-2">

          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.sender === 'user' && (
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-400"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          For specific inquiries, please use our Contact Page
        </p>
      </div>
    </div>
  );
}