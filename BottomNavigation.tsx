'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUser, 
  FaHome,
  FaStethoscope
} from 'react-icons/fa';

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  activeIcon?: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/',
    icon: <FaHome className="text-lg" />,
    activeIcon: <FaHome className="text-lg" />,
    label: 'Home'
  },
  {
    href: '/doctors',
    icon: <FaStethoscope className="text-lg" />,
    activeIcon: <FaStethoscope className="text-lg" />,
    label: 'Doctors'
  },
  {
    href: '/appointments',
    icon: <FaCalendarAlt className="text-lg" />,
    activeIcon: <FaCalendarAlt className="text-lg" />,
    label: 'Appointments'
  },
  {
    href: '/profile',
    icon: <FaUser className="text-lg" />,
    activeIcon: <FaUser className="text-lg" />,
    label: 'Profile'
  }
];

const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/90 backdrop-blur-lg border-t border-white/20 shadow-2xl">
        <div className="relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-sky-600/5 to-indigo-600/5"></div>
          
          <nav className="relative flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              
              return (
                <Link key={item.href} href={item.href} className="flex-1">
                  <motion.div
                    className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 ${
                      active 
                        ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={false}
                    animate={{
                      backgroundColor: active ? undefined : 'transparent',
                    }}
                  >
                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        className="absolute -top-1 left-1/2 w-8 h-1 bg-white rounded-full"
                        layoutId="activeIndicator"
                        initial={false}
                        animate={{ x: '-50%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Icon */}
                    <div className={`mb-1 ${active ? 'text-white' : ''}`}>
                      {active ? (item.activeIcon || item.icon) : item.icon}
                    </div>
                    
                    {/* Label */}
                    <span className={`text-xs font-medium ${active ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Safe area for devices with bottom notch */}
      <div className="bg-white/90 backdrop-blur-lg h-safe-area-inset-bottom"></div>
    </div>
  );
};

export default BottomNavigation;
