interface FAQ {
  question: string | RegExp;
  answer: string;
  keywords: string[];
}

export const knowledgeBase: FAQ[] = [
  // Greetings
  {
    question: /hello|hi|hey|greetings|good (morning|afternoon|evening)/i,
    answer: "Hello! Welcome to Zemenay Tech Blog. How can I assist you today?",
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening']
  },
  
  // About
  {
    question: /what is zemenay tech blog|about us|who are you|tell me about yourself/i,
    answer: "Zemenay Tech Blog is a platform dedicated to sharing knowledge about technology, programming, and innovation. We provide high-quality articles, tutorials, and resources for tech enthusiasts and professionals alike.",
    keywords: ['about', 'what is', 'who are you', 'zemenay', 'introduction']
  },
  
  // Contact
  {
    question: /contact|email|phone|reach us|get in touch/i,
    answer: "You can reach us through our Contact page. We're here to help with any questions or feedback you might have!",
    keywords: ['contact', 'email', 'phone', 'reach', 'support', 'help']
  },
  
  // Services
  {
    question: /services|what do you offer|products|features/i,
    answer: "We specialize in providing tech-related content including programming tutorials, technology news, coding best practices, and software development resources. Our goal is to help you stay updated in the fast-paced world of technology.",
    keywords: ['services', 'offer', 'products', 'provide', 'features']
  },
  
  // Help
  {
    question: /help|support|assistance|what can you do/i,
    answer: "I can help you with general questions about our blog, technology topics, programming concepts, and more. I can also guide you to relevant articles or resources. What would you like to know?",
    keywords: ['help', 'support', 'assistance', 'problem', 'guide']
  },
  
  // Thank you responses
  {
    question: /thank|thanks|appreciate|grateful|cheers|thx|ty/i,
    answer: "You're welcome! Is there anything else I can help you with today?",
    keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'cheers', 'thx', 'ty']
  },
  {
    question: /thank you so much|thanks a lot|really appreciate|very helpful/i,
    answer: "You're very welcome! I'm glad I could help. Don't hesitate to ask if you have any more questions!",
    keywords: ['thank you so much', 'thanks a lot', 'really appreciate', 'very helpful']
  },
  
  // Learning Resources
  {
    question: /how to start coding|learn to code|begin programming|how to become a programmer/i,
    answer: "Starting to code is exciting! Here's a roadmap to begin:\n1. Learn programming fundamentals (variables, loops, conditionals)\n2. Choose a beginner-friendly language (Python/JavaScript)\n3. Work on small projects\n4. Learn version control (Git)\n5. Join coding communities\nWe have detailed guides on our blog to help you at each step!",
    keywords: ['start coding', 'learn to code', 'beginner programming', 'how to program', 'become programmer']
  },
  {
    question: /what programming language|which language should I learn|best language for/i,
    answer: "The best language depends on your goals:\n- Web Development: JavaScript/TypeScript\n- Data Science: Python\n- Mobile Apps: Swift (iOS) or Kotlin (Android)\n- Game Dev: C# or C++\n- Systems Programming: Rust or Go\nWhat type of projects interest you?",
    keywords: ['programming language', 'which language', 'best language', 'learn first', 'language for']
  },
  {
    question: /latest tech news|technology updates|what's new in tech|tech trends/i,
    answer: "Here are some current tech trends:\n- AI and Machine Learning advancements\n- Web3 and Blockchain technologies\n- Cloud Computing innovations\n- Quantum Computing progress\n- AR/VR developments\nCheck our 'Trends' section for in-depth articles on these topics!",
    keywords: ['tech news', 'technology updates', 'what\'s new', 'latest technology', 'trends']
  },

  // Technical Support
  {
    question: /troubleshoot|problem with|not working|error|bug/i,
    answer: "I'm here to help! For better assistance, please provide:\n1. The exact error message\n2. Steps to reproduce the issue\n3. Your environment (OS, browser, etc.)\n4. What you've tried so far\nThis will help me give you a more accurate solution.",
    keywords: ['troubleshoot', 'problem', 'not working', 'error', 'issue', 'fix', 'bug']
  },
  {
    question: /how to debug|debugging tips|fixing errors/i,
    answer: "Effective debugging techniques:\n1. Read error messages carefully\n2. Use console.log() or breakpoints\n3. Check your code line by line\n4. Search for the error online\n5. Take a break and come back with fresh eyes\n6. Explain your code to someone else (rubber duck debugging)",
    keywords: ['debug', 'debugging', 'fix errors', 'troubleshoot code']
  },

  // Web Development
  {
    question: /web development|frontend|backend|full stack/i,
    answer: "Web development has several paths:\n\nFrontend:\n- HTML/CSS/JavaScript\n- Frameworks: React, Vue, Angular\n- State management (Redux, Context API)\n\nBackend:\n- Node.js, Python (Django/Flask), Ruby on Rails\n- Databases: SQL (PostgreSQL) & NoSQL (MongoDB)\n- APIs (REST, GraphQL)\n\nFull Stack combines both!",
    keywords: ['web dev', 'frontend', 'backend', 'full stack', 'web development']
  },

  // Career Advice
  {
    question: /how to get a (tech|programming) job|tech career|job search/i,
    answer: "Breaking into tech requires:\n1. Build a strong portfolio\n2. Contribute to open source\n3. Network with professionals\n4. Prepare for technical interviews\n5. Create a standout resume/LinkedIn\n6. Apply strategically\n7. Practice coding challenges (LeetCode, HackerRank)",
    keywords: ['tech job', 'programming job', 'career advice', 'job search', 'hiring']
  },

  // Project Ideas
  {
    question: /project ideas|what should I build|portfolio projects/i,
    answer: "Here are some project ideas by level:\n\nBeginner:\n- To-Do List App\n- Weather App\n- Simple Blog\n\nIntermediate:\n- E-commerce site\n- Social Media Dashboard\n- Recipe Finder App\n\nAdvanced:\n- AI Chatbot\n- Stock Market Analyzer\n- Task Automation Tool\n\nChoose something that excites you!",
    keywords: ['project ideas', 'what to build', 'portfolio projects', 'coding practice']
  },
  
  // Goodbye
  {
    question: /goodbye|bye|see you|take care|have a good (day|night)|farewell/i,
    answer: "Goodbye! Feel free to come back if you have more questions. Have a great day!",
    keywords: ['goodbye', 'bye', 'see you', 'take care', 'farewell']
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
