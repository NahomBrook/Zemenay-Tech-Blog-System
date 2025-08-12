interface FAQ {
  question: string | RegExp;
  answer: string;
  keywords: string[];
}

export const knowledgeBase: FAQ[] = [
  {
    question: /hello|hi|hey|greetings/i,
    answer: "Hello! Welcome to Zemenay Tech Blog. How can I help you today?",
    keywords: ['hello', 'hi', 'hey', 'greetings']
  },
  {
    question: /what is zemenay tech blog|about us|who are you/i,
    answer: "Zemenay Tech Blog is a platform for sharing knowledge about technology, programming, and innovation. We provide articles, tutorials, and resources for tech enthusiasts.",
    keywords: ['about', 'what is', 'who are you', 'zemenay']
  },
  {
    question: /contact|email|phone|reach us/i,
    answer: "You can contact us through our Contact page. We'll be happy to assist you with any questions or feedback!",
    keywords: ['contact', 'email', 'phone', 'reach', 'support']
  },
  {
    question: /services|what do you offer|products/i,
    answer: "We offer tech-related articles, tutorials, and resources. For specific services or inquiries, please visit our website or contact us directly.",
    keywords: ['services', 'offer', 'products', 'provide']
  },
  {
    question: /help|support|assistance/i,
    answer: "I'm here to help with general questions. For more specific assistance, please visit our website or contact our support team through the Contact page.",
    keywords: ['help', 'support', 'assistance', 'problem']
  }
];

export function findAnswer(question: string): string | null {
  const lowerQuestion = question.toLowerCase().trim();
  
  // First, try to find an exact match
  const exactMatch = knowledgeBase.find(item => 
    typeof item.question === 'string' 
      ? item.question.toLowerCase() === lowerQuestion
      : item.question.test(question)
  );
  
  if (exactMatch) return exactMatch.answer;
  
  // If no exact match, check for keywords
  for (const item of knowledgeBase) {
    if (item.keywords.some(keyword => 
      lowerQuestion.includes(keyword.toLowerCase())
    )) {
      return item.answer;
    }
  }
  
  // If no match found
  return null;
}
