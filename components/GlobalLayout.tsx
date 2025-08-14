'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingParticle = ({ delay = 0, size = 'w-2 h-2', color = 'from-pink-400 to-purple-400' }) => (
  <motion.div
    className={`absolute ${size} bg-gradient-to-r ${color} rounded-full opacity-40`}
    animate={{
      y: [-20, -80],
      x: [0, 30, -30, 0],
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-800/15 to-pink-900/20">
        <FloatingParticle delay={0} size="w-3 h-3" color="from-cyan-400 to-blue-500" />
        <FloatingParticle delay={1} size="w-2 h-2" color="from-pink-400 to-purple-400" />
        <FloatingParticle delay={2} size="w-1 h-1" color="from-yellow-400 to-orange-500" />
        <FloatingParticle delay={3} size="w-2 h-2" color="from-green-400 to-teal-500" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}