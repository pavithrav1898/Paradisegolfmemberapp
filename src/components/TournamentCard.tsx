import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';

interface TournamentCardProps {
  tournament: {
    id: string;
    title: string;
    image: string;
    date: string;
    location: string;
    memberPrice: string;
    pepMemberPrice: string;
    guestPrice: string;
    distance?: string;
  };
  index: number;
  onClick: () => void;
  variant?: 'home' | 'list';
}

export default function TournamentCard({ tournament, index, onClick, variant = 'home' }: TournamentCardProps) {
  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={onClick}
        className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
        style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)' }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <img 
            src={tournament.image} 
            alt={tournament.title}
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="font-bold text-xl mb-2" style={{ color: '#004D00' }}>
            {tournament.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Calendar className="w-4 h-4" style={{ color: '#0A810A' }} />
            <span>{tournament.date}</span>
          </div>

          {tournament.distance && (
            <div className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: '#0A810A' }}>
              <MapPin className="w-4 h-4" />
              <span>{tournament.distance}</span>
            </div>
          )}

          <div className="mb-4">
            <motion.div 
              className="text-3xl font-bold mb-2"
              style={{ color: '#0A810A' }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 + 0.1 }}
            >
              {tournament.memberPrice}
            </motion.div>
            <div className="text-sm text-gray-600">Members Price</div>
          </div>

          <div className="space-y-2 mb-4 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: '#0A810A' }} />
              <span>One Day Tournament</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: '#0A810A' }} />
              <span>{tournament.date}</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: '#0A810A' }} />
              <span>4-Player Scramble, Individual Net Quota, or just play for fun</span>
            </div>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-full py-2.5 rounded-lg font-semibold text-white text-sm"
            style={{ background: '#0A810A' }}
            whileHover={{ 
              boxShadow: '0 0 20px rgba(10, 129, 10, 0.5)' 
            }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW DETAILS
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Home variant - compact card with image and title
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)' }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        <img 
          src={tournament.image} 
          alt={tournament.title}
          className="w-full h-56 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-base mb-2 line-clamp-2" style={{ color: '#004D00' }}>
          {tournament.title}
        </h3>

        {tournament.distance && (
          <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#0A810A' }}>
            <MapPin className="w-4 h-4" />
            <span>{tournament.distance}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}