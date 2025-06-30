'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterCard from '@/components/CharacterCard';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Character {
  mal_id: number;
  name: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  about?: string;
  favorites?: number;
  name_kanji?: string;
  nicknames?: string[];
}

interface Quote {
  anime: string;
  character: string;
  quote: string;
}

const POPULAR_CHARACTERS = [
  'naruto', 'sasuke', 'goku', 'luffy', 'ichigo', 'natsu', 'edward elric',
  'light yagami', 'levi', 'mikasa', 'tanjiro', 'nezuko', 'senku',
  'rimuru', 'ainz', 'saitama', 'genos', 'mob', 'deku', 'bakugo',
  'todoroki', 'all might', 'erza', 'lucy heartfilia', 'yusuke',
  'kirito', 'asuna', 'sinon', 'accelerator', 'touma', 'misaka',
  'kakashi', 'itachi', 'madara', 'hashirama', 'minato', 'jiraiya',
  'tsunade', 'orochimaru', 'gaara', 'rock lee', 'neji', 'hinata',
  'shikamaru', 'choji', 'ino', 'kiba', 'shino', 'sakura'
];

export default function ExplorePage() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomCharacter = async () => {
    setLoading(true);
    try {
      const randomSearch = POPULAR_CHARACTERS[Math.floor(Math.random() * POPULAR_CHARACTERS.length)];
      const response = await axios.get(`https://api.jikan.moe/v4/characters?q=${randomSearch}&limit=25`);
      
      if (response.data.data?.length > 0) {
        // Filter characters that have descriptions and images
        const charactersWithInfo = response.data.data.filter((char: Character) => 
          char.about && char.about.length > 50 && char.images?.jpg?.image_url
        );
        
        if (charactersWithInfo.length > 0) {
          const randomIndex = Math.floor(Math.random() * charactersWithInfo.length);
          const selectedCharacter = charactersWithInfo[randomIndex];
          setCharacter(selectedCharacter);
          
          // Fetch a new quote when character changes
          await fetchRandomQuote();
        } else {
          // Fallback to any character from the response
          const randomIndex = Math.floor(Math.random() * response.data.data.length);
          setCharacter(response.data.data[randomIndex]);
          await fetchRandomQuote();
        }
      } else {
        // Ultimate fallback
        const fallback = await axios.get('https://api.jikan.moe/v4/characters?q=naruto&limit=1');
        if (fallback.data.data?.length > 0) {
          setCharacter(fallback.data.data[0]);
          await fetchRandomQuote();
        }
      }
    } catch (error) {
      console.error('Character fetch failed:', error);
      setCharacter({
        mal_id: 1,
        name: 'Anime Explorer',
        images: {
          jpg: {
            image_url: 'https://via.placeholder.com/300x400/ff6b35/ffffff?text=Anime+Character'
          }
        },
        about: 'Welcome to the world of anime! This legendary character represents the spirit of adventure and discovery that drives every anime fan. With countless stories to tell and infinite potential for growth, they embody the essence of what makes anime characters so compelling. Their journey through various worlds and dimensions has taught them valuable lessons about friendship, perseverance, and the power of believing in oneself. Whether facing powerful enemies or overcoming personal challenges, this character demonstrates the unwavering determination that defines the greatest heroes in anime history.',
        favorites: 99999
      });
      await fetchRandomQuote();
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const fetchRandomQuote = async () => {
    try {
      const res = await fetch('/api/quote');
      const data = await res.json();
      if (data) {
        setQuote(data);
      }
    } catch (err) {
      console.error('Quote fetch failed:', err);
      // Provide a variety of fallback quotes
      const fallbackQuotes = [
        {
          anime: 'Naruto',
          character: 'Naruto Uzumaki',
          quote: 'I\'m not gonna run away, I never go back on my word! That\'s my nindo: my ninja way!'
        },
        {
          anime: 'One Piece',
          character: 'Monkey D. Luffy',
          quote: 'I don\'t want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!'
        },
        {
          anime: 'Dragon Ball Z',
          character: 'Son Goku',
          quote: 'I would rather be a brainless monkey than a heartless monster.'
        },
        {
          anime: 'Attack on Titan',
          character: 'Eren Yeager',
          quote: 'If you win, you live. If you lose, you die. If you don\'t fight, you can\'t win!'
        },
        {
          anime: 'My Hero Academia',
          character: 'Izuku Midoriya',
          quote: 'Sometimes I do feel like I\'m a failure. Like there\'s no hope for me. But even so, I\'m not gonna give up. Ever!'
        }
      ];
      
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote);
    }
  };

  const handleNewCharacter = async () => {
    await fetchRandomCharacter();
  };

  const handleNewQuote = async () => {
    await fetchRandomQuote();
  };

  useEffect(() => {
    handleNewCharacter();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Naruto-themed Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900">
        <div className="absolute inset-0 naruto-leaves-bg opacity-20" />
        <div className="absolute inset-0 naruto-spiral-bg opacity-10" />

        {/* Floating Ninja Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            style={{
              position: 'absolute',
              left: `${10 + i * 12}%`,
              top: `${10 + i * 8}%`,
            }}
            className="w-6 h-6 bg-orange-400/20 rounded-full blur-sm rasengan-effect"
          />
        ))}

        {/* Hokage Mountain Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-48 hokage-mountain opacity-20" />
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border-orange-300/50 hover:border-orange-300/70 backdrop-blur-sm chakra-pulse"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Village
          </Button>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <CharacterCard
            character={character}
            quote={quote}
            loading={loading}
            onNewCharacter={handleNewCharacter}
            onNewQuote={handleNewQuote}
          />
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-orange-200/70 text-sm text-center"
      >
        <p>Powered by Jikan API & AnimeChan API | Believe it! 🍥</p>
      </motion.div>
    </div>
  );
}