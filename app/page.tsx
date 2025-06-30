'use client';

import { motion } from 'framer-motion';
import { Sparkles, Search, Star, Zap, Heart, Play, Wind, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMemo } from 'react';

export default function LandingPage() {
  // Memoize expensive calculations
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }), []);

  const floatingVariants = useMemo(() => ({
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }), []);

  const features = useMemo(() => [
    {
      icon: Search,
      title: 'Ninja Search',
      description: 'Find any anime character with the speed of a Hidden Leaf ninja',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Sparkles,
      title: 'Jutsu Discovery',
      description: 'Discover new characters and quotes with our mystical jutsu generator',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Star,
      title: 'Shinobi Profiles',
      description: 'Detailed character scrolls with beautiful ninja art presentations',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Heart,
      title: 'Will of Fire',
      description: 'Get inspired by legendary quotes that embody the Will of Fire',
      color: 'from-red-500 to-pink-500',
    },
  ], []);

  const particles = useMemo(
    () =>
      [...Array(6)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: i * 0.3,
        type: i % 4,
      })),
    []
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900">
        <div className="absolute inset-0 naruto-leaves-bg opacity-10" />
        <div className="absolute inset-0 naruto-spiral-bg opacity-5" />
        <div className="absolute bottom-0 left-0 right-0 h-64 hokage-mountain opacity-20" />

        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute particle-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: `${particle.delay}s`,
            }}
            variants={floatingVariants}
            animate="animate"
          >
            {particle.type === 0 && (
              <div className="w-2 h-2 bg-orange-400/20 rounded-full blur-sm" />
            )}
            {particle.type === 1 && (
              <div className="w-1 h-1 bg-red-400/30 transform rotate-45" />
            )}
            {particle.type === 2 && (
              <div className="w-2 h-1 bg-yellow-400/15 rounded-full wind-effect" />
            )}
            {particle.type === 3 && (
              <div className="w-1 h-1 bg-blue-400/20 rounded-full chakra-pulse" />
            )}
          </motion.div>
        ))}

        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full rasengan-effect blur-lg"
        />

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            animate={{
              rotate: [0, 180],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
            style={{
              position: 'absolute',
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`,
            }}
            className="w-4 h-4 text-orange-400/15"
          >
            <Star className="w-full h-full fill-current" />
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center rasengan-effect"
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(255, 107, 53, 0.2)',
                    '0 0 25px rgba(255, 107, 53, 0.4)',
                    '0 0 15px rgba(255, 107, 53, 0.2)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Zap className="w-12 h-12 text-white drop-shadow-lg" />
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center"
              >
                <Wind className="w-4 h-4 text-white" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center"
              >
                <Flame className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6 naruto-gradient-text drop-shadow-2xl"
          >
            AnimeNota
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-orange-100 mb-4 max-w-2xl leading-relaxed drop-shadow-lg"
          >
            Embark on an epic journey through the ninja world of anime characters
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-orange-200/80 mb-8 max-w-xl leading-relaxed"
          >
            Discover legendary shinobi, explore their jutsu, and get inspired by the Will of Fire
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 mb-16"
        >
          <Link href="/explore">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 px-8 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 fire-jutsu-effect"
            >
              <Play className="w-6 h-6 mr-3" />
              Begin Your Ninja Way
            </Button>
          </Link>

          <Link href="/search">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-orange-300/50 hover:border-orange-300/70 px-8 py-4 text-lg font-bold rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 chakra-pulse"
            >
              <Search className="w-6 h-6 mr-3" />
              Search Shinobi
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-orange-300/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-orange-300/40"
            >
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${feature.color} mb-4 shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">{feature.title}</h3>
              <p className="text-orange-100/90 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          {[
            { number: '10K+', label: 'Shinobi', icon: '🥷' },
            { number: '500+', label: 'Villages', icon: '🏯' },
            { number: '∞', label: 'Jutsu', icon: '⚡' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.1 }}
              className="text-white"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold naruto-gradient-text mb-2 drop-shadow-lg">
                {stat.number}
              </div>
              <div className="text-orange-200/80 text-sm uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 max-w-2xl"
        >
          <motion.blockquote
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 107, 53, 0.3)',
                '0 0 20px rgba(255, 107, 53, 0.5)',
                '0 0 10px rgba(255, 107, 53, 0.3)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-lg md:text-xl text-orange-100 italic font-medium leading-relaxed"
          >
            "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!"
          </motion.blockquote>
          <motion.cite className="block mt-4 text-orange-300 font-bold">
            — Naruto Uzumaki
          </motion.cite>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-orange-300/50 rounded-full flex justify-center backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-orange-400/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
