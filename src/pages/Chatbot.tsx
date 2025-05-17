import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowUp, User, Bot, Info, MoreHorizontal, Image, Mic, Paperclip } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I'm your Health Assistant AI. How can I help you today? You can ask me about symptoms, general health advice, or medical information.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Sample health-related queries for suggestion bubbles
  const suggestionQueries = [
    'What are symptoms of a cold?',
    'How to reduce a fever?',
    'What causes migraines?',
    'Is my cough serious?',
    'How to improve sleep?',
    'What's good for a sore throat?'
  ];

  // Automatically scroll to bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses: {[key: string]: string} = {
        cold: 'Common cold symptoms include runny nose, sore throat, coughing, and sneezing. Rest, stay hydrated, and consider over-the-counter medications for symptom relief. If symptoms persist for more than 10 days or are severe, consult a healthcare professional.',
        fever: 'To reduce a fever: take acetaminophen or ibuprofen as directed, stay hydrated, rest, and dress in lightweight clothing. If the fever is above 103°F (39.4°C), lasts more than three days, or is accompanied by severe symptoms, seek medical attention.',
        migraine: 'Migraines are often caused by genetic factors, hormonal changes, stress, certain foods, weather changes, or sleep disruptions. Triggers vary from person to person. Managing stress, maintaining a regular sleep schedule, and avoiding personal triggers can help prevent migraines.',
        cough: 'A cough can be caused by various conditions from minor irritations to more serious issues. If your cough persists for more than three weeks, produces discolored mucus, or is accompanied by shortness of breath, chest pain, or fever, it's advisable to consult a healthcare professional for proper evaluation.',
        sleep: 'To improve sleep: maintain a consistent sleep schedule, create a relaxing bedtime routine, ensure your bedroom is dark and cool, limit screen time before bed, avoid caffeine and large meals in the evening, and exercise regularly (but not close to bedtime).',
        throat: 'For a sore throat, try: gargling with warm salt water, staying hydrated, using throat lozenges, drinking warm liquids like tea with honey, using a humidifier, and resting your voice. If the sore throat is severe, lasts longer than a week, or is accompanied by difficulty swallowing or breathing, seek medical attention.',
      };
      
      // Determine which response to give based on keywords in the user's message
      let botResponseText = 'I apologize, but I don\'t have specific information about that query. For accurate medical advice, please consult with a healthcare professional.';
      
      const userMessageLower = inputMessage.toLowerCase();
      
      if (userMessageLower.includes('cold') || userMessageLower.includes('flu') || userMessageLower.includes('runny nose')) {
        botResponseText = botResponses.cold;
      } else if (userMessageLower.includes('fever') || userMessageLower.includes('temperature')) {
        botResponseText = botResponses.fever;
      } else if (userMessageLower.includes('migraine') || userMessageLower.includes('headache')) {
        botResponseText = botResponses.migraine;
      } else if (userMessageLower.includes('cough')) {
        botResponseText = botResponses.cough;
      } else if (userMessageLower.includes('sleep') || userMessageLower.includes('insomnia')) {
        botResponseText = botResponses.sleep;
      } else if (userMessageLower.includes('throat') || userMessageLower.includes('sore')) {
        botResponseText = botResponses.throat;
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container-custom max-w-4xl">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-teal-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Health Chatbot</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chat with our AI assistant for immediate health guidance and information. 
            Remember, this is not a substitute for professional medical advice.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Chat header */}
          <div className="bg-teal-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Bot size={24} className="mr-2" />
              <div>
                <h2 className="font-semibold">Health Assistant AI</h2>
                <p className="text-xs text-teal-100">Online | Powered by Medical AI</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="text-teal-100 hover:text-white transition-colors">
                <Info size={20} />
              </button>
              <button className="text-teal-100 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-96 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={18} className="text-teal-700" />
                  </div>
                )}
                <div 
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user' 
                      ? 'bg-teal-500 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-teal-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center ml-2 flex-shrink-0">
                    <User size={18} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex mb-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot size={18} className="text-teal-700" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={endOfMessagesRef} />
          </div>
          
          {/* Suggestion bubbles */}
          <div className="px-4 py-3 bg-gray-100 overflow-x-auto">
            <div className="flex space-x-2 whitespace-nowrap">
              {suggestionQueries.map((query, index) => (
                <button 
                  key={index}
                  onClick={() => handleSuggestionClick(query)}
                  className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-full border border-gray-300 hover:bg-gray-50 whitespace-nowrap"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 mr-1">
                <Paperclip size={20} />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 mr-1">
                <Image size={20} />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 mr-2">
                <Mic size={20} />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your health question here..."
                className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button 
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ''}
                className={`ml-2 p-3 rounded-full ${
                  inputMessage.trim() === '' 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Disclaimer */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <Info size={20} className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-amber-800 font-medium">Health Chatbot Disclaimer</h3>
              <p className="text-amber-700 text-sm mt-1">
                This AI chatbot provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment. 
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;