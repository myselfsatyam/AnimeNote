'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Loader2, Star, Heart, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const searchCharacters = async (query: string) => {
    if (!query.trim()) {
      setCharacters([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/characters?q=${query}&limit=20`);
      if (response.data.data) {
        // Sort by favorites to show more popular characters first
        const sortedCharacters = response.data.data.sort((a: Character, b: Character) => {
          return (b.favorites || 0) - (a.favorites || 0);
        });
        setCharacters(sortedCharacters);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchCharacters(searchTerm);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Enhanced character description processing
  const getEnhancedDescription = (about?: string, name?: string) => {
    if (!about || about.length < 50) {
      return `${name} is a fascinating character from the anime universe, known for their unique abilities and compelling story arc. This character has captured the hearts of fans worldwide with their distinctive personality and significant role in their respective series.`;
    }
    
    // Clean up the description
    let cleanedAbout = about.replace(/\n\n+/g, '\n\n').trim();
    
    // If description is too short, enhance it
    if (cleanedAbout.length < 150) {
      cleanedAbout += ` This character has become a beloved figure in the anime community, inspiring fans with their unique story and memorable moments.`;
    }
    
    return cleanedAbout;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Naruto-themed Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900">
        <div className="absolute inset-0 naruto-leaves-bg opacity-20" />
        <div className="absolute inset-0 naruto-spiral-bg opacity-10" />
        
        {/* Floating Ninja Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            style={{
              position: 'absolute',
              left: `${10 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            className="w-4 h-4 bg-orange-400/20 rounded-full blur-sm particle-float"
          />
        ))}

        {/* Hokage Mountain Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 hokage-mountain opacity-15" />
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
      <div className="relative z-10 min-h-screen p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-4 naruto-gradient-text drop-shadow-2xl"
            >
              Shinobi Search
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-orange-100 mb-8 drop-shadow-lg"
            >
              Find your favorite ninja warriors from across all villages
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-200/80 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for shinobi (e.g., Naruto, Sasuke, Kakashi...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 border-orange-300/30 text-white placeholder-orange-200/60 rounded-full backdrop-blur-sm focus:bg-white/20 focus:border-orange-300/50 transition-all duration-300 shadow-lg"
                />
                {loading && (
                  <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-200/80 w-5 h-5 animate-spin" />
                )}
              </div>
            </motion.div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {characters.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {characters.map((character) => (
                  <motion.div
                    key={character.mal_id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCharacter(character)}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-orange-300/20 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 group hover:border-orange-300/40"
                  >
                    <div className="relative mb-4">
                      <img
                        src={character.images.jpg.image_url}
                        alt={character.name}
                        className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/300x400/ff6b35/ffffff?text=No+Image';
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-black/50 rounded-full p-2 backdrop-blur-sm">
                        <Heart className="w-4 h-4 text-orange-300" />
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-orange-200 transition-colors drop-shadow-sm">
                      {character.name}
                    </h3>
                    {character.name_kanji && (
                      <p className="text-orange-200/70 text-sm mb-2">{character.name_kanji}</p>
                    )}
                    {character.favorites && (
                      <div className="flex items-center text-yellow-400 text-sm mb-2">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {character.favorites.toLocaleString()} favorites
                      </div>
                    )}
                    {character.about && (
                      <p className="text-orange-100/80 text-xs line-clamp-2">
                        {character.about.substring(0, 80)}...
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results */}
          {searchTerm && !loading && characters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">No shinobi found</h3>
              <p className="text-orange-200/80">Try searching for a different ninja name</p>
            </motion.div>
          )}

          {/* Empty State */}
          {!searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🥷</div>
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Begin your search</h3>
              <p className="text-orange-200/80">Enter a shinobi name to discover legendary ninja warriors</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Enhanced Character Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-orange-300/20 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={selectedCharacter.images.jpg.image_url}
                    alt={selectedCharacter.name}
                    className="w-64 h-80 object-cover rounded-2xl mx-auto shadow-lg"
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
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2 naruto-gradient-text drop-shadow-lg">
                  {selectedCharacter.name}
                </h2>
                
                {selectedCharacter.name_kanji && (
                  <p className="text-orange-200/80 text-lg mb-4">{selectedCharacter.name_kanji}</p>
                )}
                
                {selectedCharacter.nicknames && selectedCharacter.nicknames.length > 0 && (
                  <p className="text-orange-300/70 text-sm mb-4">
                    Also known as: {selectedCharacter.nicknames.slice(0, 3).join(', ')}
                  </p>
                )}

                {/* Character Stats */}
                {selectedCharacter.favorites && (
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-full px-6 py-2 border border-orange-300/20">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-400 fill-current" />
                        <span className="text-orange-200 font-semibold">
                          {selectedCharacter.favorites.toLocaleString()} favorites
                        </span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Description */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 mb-6 border border-orange-300/10 backdrop-blur-sm text-left">
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="w-5 h-5 text-orange-300" />
                    <h3 className="text-orange-200 font-semibold text-lg">Character Profile</h3>
                  </div>
                  <p className="text-orange-100/90 leading-relaxed">
                    {getEnhancedDescription(selectedCharacter.about, selectedCharacter.name)}
                  </p>
                </div>
                
                <Button
                  onClick={() => setSelectedCharacter(null)}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 px-8 py-3 rounded-full fire-jutsu-effect"
                >
                  Close Scroll
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}