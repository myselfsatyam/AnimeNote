'use client';

import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Quote, Search, Star, Heart, Users } from 'lucide-react';
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

interface CharacterCardProps {
  character: Character | null;
  quote: Quote | null;
  loading: boolean;
  onNewCharacter: () => void;
  onNewQuote: () => void;
}

export default function CharacterCard({
  character,
  quote,
  loading,
  onNewCharacter,
  onNewQuote,
}: CharacterCardProps) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-orange-300/20 shadow-2xl">
          <div className="animate-pulse space-y-6">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="w-48 h-64 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-2xl mx-auto rasengan-effect"
            />
            <div className="space-y-3">
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="h-8 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-lg w-3/4 mx-auto"
              />
              <motion.div
                variants={pulseVariants}
                animate="animate"
                style={{ animationDelay: '0.2s' }}
                className="h-4 bg-white/20 rounded w-full"
              />
              <motion.div
                variants={pulseVariants}
                animate="animate"
                style={{ animationDelay: '0.4s' }}
                className="h-4 bg-white/20 rounded w-5/6"
              />
            </div>
            <motion.div
              variants={pulseVariants}
              animate="animate"
              style={{ animationDelay: '0.6s' }}
              className="h-32 bg-white/20 rounded-xl"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  if (!character) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-3xl mx-auto text-center"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-orange-300/20 shadow-2xl">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="rasengan-effect"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-orange-400 drop-shadow-lg" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to the Hidden Leaf Village
          </h2>
          <p className="text-orange-100/90 mb-8">
            Discover legendary shinobi and their inspiring ninja way
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onNewCharacter}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 fire-jutsu-effect"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Begin Ninja Way
            </Button>
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-orange-300/50 hover:border-orange-300/70 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 chakra-pulse"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Shinobi
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Enhanced character description processing
  const getEnhancedDescription = (about?: string, name?: string) => {
    if (!about || about.length < 50) {
      return `${name} is a fascinating character from the anime universe, known for their unique abilities and compelling story arc. This character has captured the hearts of fans worldwide with their distinctive personality, memorable quotes, and significant role in their respective series. Their journey showcases themes of growth, friendship, and determination that resonate deeply with audiences. Through various challenges and adventures, they have demonstrated remarkable resilience and have become an iconic figure in anime culture.`;
    }
    
    // Clean up the description and ensure it's comprehensive
    let cleanedAbout = about.replace(/\n\n+/g, '\n\n').trim();
    
    // If description is too short, enhance it
    if (cleanedAbout.length < 200) {
      cleanedAbout += ` This character has become a beloved figure in the anime community, inspiring countless fans with their unique story and memorable moments throughout their series.`;
    }
    
    return cleanedAbout;
  };

  const enhancedDescription = getEnhancedDescription(character.about, character.name);
  
  // Show more of the description (increased from 300 to 500 characters)
  const displayDescription = enhancedDescription.length > 500
    ? enhancedDescription.substring(0, 500) + '...'
    : enhancedDescription;

  return (
    <motion.div
      key={character.mal_id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-orange-300/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="relative inline-block">
            <motion.img
              src={character.images.jpg.image_url}
              alt={character.name}
              className="w-48 h-64 object-cover rounded-2xl shadow-lg mx-auto"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/300x400/ff6b35/ffffff?text=No+Image';
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full rasengan-effect"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full chakra-pulse"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 naruto-gradient-text drop-shadow-lg">
            {character.name}
          </h1>
          {character.name_kanji && (
            <p className="text-orange-200/80 text-lg mb-2">{character.name_kanji}</p>
          )}
          {character.nicknames && character.nicknames.length > 0 && (
            <p className="text-orange-300/70 text-sm">
              Also known as: {character.nicknames.slice(0, 3).join(', ')}
            </p>
          )}
        </motion.div>

        {/* Character Stats */}
        {character.favorites && (
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-full px-6 py-2 border border-orange-300/20">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span className="text-orange-200 font-semibold">
                  {character.favorites.toLocaleString()} favorites
                </span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-orange-300/10 backdrop-blur-sm">
            <div className="flex items-start space-x-3 mb-4">
              <Users className="w-5 h-5 text-orange-300 mt-1 flex-shrink-0" />
              <h3 className="text-orange-200 font-semibold text-lg">Character Profile</h3>
            </div>
            <p className="text-orange-100/90 leading-relaxed text-base">
              {displayDescription}
            </p>
          </div>
        </motion.div>

        {quote && (
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 mb-8 border border-orange-300/10 backdrop-blur-sm"
          >
            <div className="flex items-start space-x-3">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Quote className="w-6 h-6 text-orange-300 mt-1 flex-shrink-0" />
              </motion.div>
              <div>
                <h3 className="text-orange-200 font-semibold text-lg mb-3">Inspirational Quote</h3>
                <p className="text-orange-100/90 italic text-lg leading-relaxed mb-3">
                  "{quote.quote}"
                </p>
                <p className="text-orange-300 font-semibold">
                  — {quote.character} from {quote.anime}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onNewCharacter}
            disabled={loading}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 px-6 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 fire-jutsu-effect"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            New Shinobi
          </Button>
          <Button
            onClick={onNewQuote}
            disabled={loading}
            size="lg"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-orange-300/50 hover:border-orange-300/70 px-6 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 chakra-pulse"
          >
            <Quote className="w-5 h-5 mr-2" />
            New Jutsu Quote
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}