'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Move character database outside component to prevent recreation
const NARUTO_RESPONSES = {
  greetings: [
    "Hey there, dattebayo! I'm Naruto Uzumaki, future Hokage of the Hidden Leaf Village!",
    "Yo! What's up, dattebayo? Ready for some ninja talk?",
    "Believe it! Naruto Uzumaki here, ready to help you out!",
    "Hey hey! The future Hokage is here to chat, dattebayo!"
  ],
  
  motivation: [
    "Never give up, dattebayo! That's my ninja way!",
    "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!",
    "When people are protecting something truly special to them, they truly can become as strong as they can be, dattebayo!",
    "Hard work is necessary to become strong, but believing in yourself is even more important!",
    "The pain of being alone is completely out of this world, isn't it? But you know what? We don't have to feel that pain anymore, dattebayo!"
  ],
  
  friendship: [
    "Friends are the most important thing, dattebayo! They make you stronger!",
    "I'll never let my friends down! That's a promise of a lifetime!",
    "The bonds we share with our friends give us the strength to keep going, believe it!",
    "A real friend is someone who walks in when the rest of the world walks out, dattebayo!"
  ],
  
  dreams: [
    "My dream is to become Hokage and protect everyone in the village, dattebayo!",
    "Dreams don't have expiration dates! Keep chasing them, believe it!",
    "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be!",
    "I'm gonna be the greatest Hokage ever, dattebayo!"
  ],
  
  food: [
    "Ramen is the best food in the world, dattebayo! Especially Ichiraku Ramen!",
    "Nothing beats a hot bowl of ramen after training! Want to grab some, dattebayo?",
    "Ramen gives me the energy to keep going! It's ninja fuel, believe it!",
    "I could eat ramen every day for the rest of my life, dattebayo!"
  ],
  
  training: [
    "Training hard every day is the only way to get stronger, dattebayo!",
    "Shadow Clone Jutsu helps me train faster! More clones, more training!",
    "Even if I fail, I'll keep trying until I succeed! That's what it means to never give up!",
    "The harder the training, the stronger you become, believe it!"
  ],
  
  default: [
    "That's interesting, dattebayo! Tell me more!",
    "Hmm, I'm not sure about that, but I believe everything works out in the end!",
    "Believe it! Whatever you're going through, you can handle it!",
    "That sounds tough, but remember - never give up, dattebayo!",
    "I may not understand everything, but I'm here to listen, believe it!",
    "Wow, that's something! The ninja world is full of surprises, dattebayo!",
    "Keep your head up! Things always get better when you don't give up!"
  ]
};

// Comprehensive character database - moved outside component
const CHARACTER_DATABASE = {
  // Naruto Characters
  'naruto': {
    name: 'Naruto Uzumaki',
    anime: 'Naruto',
    description: "That's me, dattebayo! I'm the Seventh Hokage of the Hidden Leaf Village! I was born with the Nine-Tailed Fox sealed inside me, which made my childhood pretty tough. But I never gave up on my dream to become Hokage and be acknowledged by everyone! My ninja way is to never go back on my word!",
    abilities: ['Shadow Clone Jutsu', 'Rasengan', 'Sage Mode', 'Nine-Tails Chakra Mode'],
    quote: "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!"
  },
  'sasuke': {
    name: 'Sasuke Uchiha',
    anime: 'Naruto',
    description: "Sasuke is my best friend and rival, dattebayo! He's from the Uchiha clan and has the Sharingan. He went through a lot of pain when his brother Itachi destroyed their clan. Sasuke left the village to get stronger, but we brought him back because that's what friends do! He's really strong and helps protect the village now.",
    abilities: ['Sharingan', 'Rinnegan', 'Chidori', 'Susanoo', 'Amaterasu'],
    quote: "I have long since closed my eyes... My only goal is in the darkness."
  },
  'kakashi': {
    name: 'Kakashi Hatake',
    anime: 'Naruto',
    description: "Kakashi-sensei is the best teacher ever, dattebayo! He's known as the Copy Ninja because he can copy other people's jutsu with his Sharingan. He taught me, Sasuke, and Sakura so much about being ninja and working as a team. He became the Sixth Hokage before I did!",
    abilities: ['Sharingan', 'Chidori', 'Kamui', 'Copy Jutsu'],
    quote: "In the ninja world, those who break the rules are scum, that's true, but those who abandon their friends are worse than scum."
  },
  'sakura': {
    name: 'Sakura Haruno',
    anime: 'Naruto',
    description: "Sakura-chan is one of my teammates and she's incredibly strong, dattebayo! She trained under Tsunade-sama and became an amazing medical ninja. She can punch through anything with her super strength! She's always been there for the team, even when things got really tough.",
    abilities: ['Medical Ninjutsu', 'Super Strength', 'Chakra Control', 'Healing'],
    quote: "I won't allow my comrades to die. I'll become stronger, so I can save them."
  },
  
  // Dragon Ball Characters
  'goku': {
    name: 'Son Goku',
    anime: 'Dragon Ball',
    description: "Goku is amazing, dattebayo! He's a Saiyan warrior who loves fighting strong opponents and protecting Earth! Just like me, he never gives up and always tries to get stronger. He can transform into Super Saiyan forms that make him incredibly powerful! His pure heart and love for fighting reminds me of my own ninja way!",
    abilities: ['Kamehameha', 'Super Saiyan Transformations', 'Ultra Instinct', 'Instant Transmission'],
    quote: "I would rather be a brainless monkey than a heartless monster."
  },
  'vegeta': {
    name: 'Vegeta',
    anime: 'Dragon Ball',
    description: "Vegeta is the Prince of all Saiyans, dattebayo! He started as Goku's rival, kind of like how Sasuke was my rival. He's really proud and always wants to be the strongest! Even though he acts tough, he really cares about his family and protecting Earth. His rivalry with Goku makes them both stronger!",
    abilities: ['Big Bang Attack', 'Final Flash', 'Super Saiyan Transformations', 'Galick Gun'],
    quote: "I am the prince of all Saiyans once again!"
  },
  
  // One Piece Characters
  'luffy': {
    name: 'Monkey D. Luffy',
    anime: 'One Piece',
    description: "Luffy is so cool, dattebayo! He's a pirate who wants to become the Pirate King, just like how I wanted to become Hokage! He ate a Devil Fruit that made his body like rubber. He's always protecting his crew and never gives up on his dreams. His determination reminds me a lot of myself!",
    abilities: ['Rubber Powers', 'Gear Transformations', 'Haki', 'Gomu Gomu Techniques'],
    quote: "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!"
  },
  'zoro': {
    name: 'Roronoa Zoro',
    anime: 'One Piece',
    description: "Zoro is Luffy's first mate and he's incredibly strong, dattebayo! He uses three swords at once - that's so cool! He's really loyal to Luffy and would do anything to help him become Pirate King. His dedication to training and getting stronger is just like how I trained to become Hokage!",
    abilities: ['Three-Sword Style', 'Haki', 'Demon Aura', 'Sword Techniques'],
    quote: "Nothing happened."
  },
  
  // Attack on Titan Characters
  'eren': {
    name: 'Eren Yeager',
    anime: 'Attack on Titan',
    description: "Eren has been through so much, dattebayo! He can transform into a Titan and he's really determined to protect humanity. His story is pretty dark and complicated, but I understand his desire to protect the people he cares about. Sometimes the path to protecting others isn't easy to understand.",
    abilities: ['Titan Transformation', 'Attack Titan', 'Founding Titan', 'Hardening'],
    quote: "If you win, you live. If you lose, you die. If you don't fight, you can't win!"
  },
  'levi': {
    name: 'Levi Ackerman',
    anime: 'Attack on Titan',
    description: "Levi is known as humanity's strongest soldier, dattebayo! He's really skilled at fighting Titans and he's super fast with his ODM gear. Even though he seems cold, he really cares about his comrades. His dedication to protecting humanity is something I really respect!",
    abilities: ['ODM Gear Mastery', 'Combat Skills', 'Ackerman Powers', 'Leadership'],
    quote: "The only thing we're allowed to do is to believe that we won't regret the choice we made."
  },
  
  // My Hero Academia Characters
  'deku': {
    name: 'Izuku Midoriya',
    anime: 'My Hero Academia',
    description: "Deku is a lot like me, dattebayo! He was born without a Quirk but he never gave up on his dream to become a hero! He inherited One For All and now he's training to be the greatest hero. His determination and his desire to save everyone reminds me so much of my own ninja way!",
    abilities: ['One For All', 'Detroit Smash', 'Full Cowling', 'Blackwhip'],
    quote: "Sometimes I do feel like I'm a failure. Like there's no hope for me. But even so, I'm not gonna give up. Ever!"
  },
  'bakugo': {
    name: 'Katsuki Bakugo',
    anime: 'My Hero Academia',
    description: "Bakugo is Deku's childhood friend and rival, dattebayo! He's got an explosive personality to match his explosive Quirk! Even though he acts mean, he's actually really talented and wants to be the number one hero. His rivalry with Deku makes them both stronger, just like me and Sasuke!",
    abilities: ['Explosion Quirk', 'AP Shot', 'Howitzer Impact', 'Combat Skills'],
    quote: "I'll be the number one hero, no matter what!"
  },
  
  // Demon Slayer Characters
  'tanjiro': {
    name: 'Tanjiro Kamado',
    anime: 'Demon Slayer',
    description: "Tanjiro is such a kind person, dattebayo! He became a demon slayer to save his sister Nezuko who was turned into a demon. Even when fighting demons, he shows them compassion. His love for his family and his determination to never give up really inspires me!",
    abilities: ['Water Breathing', 'Sun Breathing', 'Enhanced Senses', 'Demon Slayer Mark'],
    quote: "No matter how many people you may lose, you have no choice but to go on living."
  },
  'nezuko': {
    name: 'Nezuko Kamado',
    anime: 'Demon Slayer',
    description: "Nezuko is Tanjiro's little sister who was turned into a demon, dattebayo! But she's different from other demons because she protects humans instead of eating them. Her bond with Tanjiro is so strong, it reminds me of how important family and bonds are!",
    abilities: ['Demon Transformation', 'Blood Demon Art', 'Size Manipulation', 'Regeneration'],
    quote: "Hmm! Hmm!"
  },
  
  // One Punch Man Characters
  'saitama': {
    name: 'Saitama',
    anime: 'One Punch Man',
    description: "Saitama is the strongest hero ever, dattebayo! He can defeat any enemy with just one punch! He got so strong through simple training - 100 push-ups, 100 sit-ups, 100 squats, and a 10km run every day! His dedication to training is incredible, even if his methods seem simple!",
    abilities: ['One Punch', 'Incredible Speed', 'Invulnerability', 'Serious Punch'],
    quote: "I'm just a guy who's a hero for fun."
  },
  
  // Fullmetal Alchemist Characters
  'edward': {
    name: 'Edward Elric',
    anime: 'Fullmetal Alchemist',
    description: "Edward is the Fullmetal Alchemist, dattebayo! He and his brother Alphonse tried to bring their mother back with alchemy, but it went wrong. Now he's trying to get his brother's body back. His determination to fix his mistakes and protect his brother is really admirable!",
    abilities: ['Alchemy', 'Automail Combat', 'Transmutation', 'Combat Skills'],
    quote: "A lesson without pain is meaningless. For you cannot gain anything without sacrificing something else in return."
  }
};

export default function NarutoChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Memoize scroll function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Memoize message functions
  const addNarutoMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const addUserMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // Memoize character search function
  const findCharacterInfo = useCallback((message: string): any => {
    const lowerMessage = message.toLowerCase();
    for (const [key, character] of Object.entries(CHARACTER_DATABASE)) {
      if (lowerMessage.includes(key.toLowerCase()) || 
          lowerMessage.includes(character.name.toLowerCase())) {
        return character;
      }
    }
    return null;
  }, []);

  // Memoize response generation
  const generateNarutoResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for character queries first
    const characterInfo = findCharacterInfo(userMessage);
    if (characterInfo) {
      return `Oh, you're asking about ${characterInfo.name} from ${characterInfo.anime}, dattebayo! ${characterInfo.description} Their most famous quote is: "${characterInfo.quote}" Believe it!`;
    }
    
    // Check for specific topics
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      const responses = NARUTO_RESPONSES.greetings;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('inspire') || lowerMessage.includes('encourage') || 
        lowerMessage.includes('never give up') || lowerMessage.includes('keep going')) {
      const responses = NARUTO_RESPONSES.motivation;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('friend') || lowerMessage.includes('friendship') || lowerMessage.includes('bond') || 
        lowerMessage.includes('team') || lowerMessage.includes('comrade')) {
      const responses = NARUTO_RESPONSES.friendship;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('dream') || lowerMessage.includes('goal') || lowerMessage.includes('hokage') || 
        lowerMessage.includes('future') || lowerMessage.includes('aspiration')) {
      const responses = NARUTO_RESPONSES.dreams;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('food') || lowerMessage.includes('ramen') || lowerMessage.includes('eat') || 
        lowerMessage.includes('hungry') || lowerMessage.includes('meal')) {
      const responses = NARUTO_RESPONSES.food;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('train') || lowerMessage.includes('training') || lowerMessage.includes('practice') || 
        lowerMessage.includes('strong') || lowerMessage.includes('jutsu')) {
      const responses = NARUTO_RESPONSES.training;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default response
    const responses = NARUTO_RESPONSES.default;
    return responses[Math.floor(Math.random() * responses.length)];
  }, [findCharacterInfo]);

  // Memoize send message handler
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const response = generateNarutoResponse(userMessage);
      addNarutoMessage(response);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  }, [inputValue, addUserMessage, addNarutoMessage, generateNarutoResponse]);

  // Memoize key press handler
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Optimize scroll effect
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  // Memoize initial message
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addNarutoMessage("Hey there, dattebayo! I'm Naruto Uzumaki, future Hokage of the Hidden Leaf Village! What would you like to chat about? I can tell you about anime characters, give you motivation, or just have a friendly ninja conversation!");
      }, 500);
    }
  }, [messages.length, addNarutoMessage]);

  // Memoize animation variants
  const chatVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  }), []);

  const messageVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }), []);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed bottom-20 right-4 z-40 bg-white rounded-lg shadow-2xl border border-gray-200 ${
              isMinimized ? 'w-80 h-12' : 'w-96 h-96'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">N</span>
                </div>
                <div>
                  <h3 className="font-semibold">Naruto Uzumaki</h3>
                  <p className="text-xs opacity-90">Future Hokage</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 space-y-3 max-h-64 overflow-y-auto">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg ${
                            message.isUser
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Chat with Naruto, dattebayo!"
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}