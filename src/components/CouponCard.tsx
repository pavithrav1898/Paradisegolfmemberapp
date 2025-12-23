import React, { useState } from 'react';
import { MapPin, Info, Clock, Phone, Globe, Navigation, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CouponCardProps {
  coupon: {
    id: string;
    title: string;
    course: string;
    logo: string;
    price: string;
    date: string;
    timeSlot: string;
    type: string;
    distance: string;
    rateType?: string;
    contact?: string;
    website?: string;
    description?: string;
  };
  index: number;
  onClick: () => void;
}

export default function CouponCard({ coupon, index, onClick }: CouponCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  const getCouponTypeColor = (type: string) => {
    switch(type) {
      case 'Discount Card':
        return '#F4A000';
      case 'Complimentary Round':
      case 'Member for a Day':
        return '#0A810A';
      case 'Double Eagle':
        return '#004D00';
      default:
        return '#004D00';
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden cursor-pointer"
        style={{ 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 77, 0, 0.1)',
          height: '100%'
        }}
        onClick={onClick}
      >
        <div className="p-4">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.2, type: 'spring' }}
                  className="px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${getCouponTypeColor(coupon.type)} 0%, ${getCouponTypeColor(coupon.type)}dd 100%)` }}
                >
                  {coupon.type.toUpperCase()}
                </motion.div>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo(true);
                  }}
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: '#F3F4F6' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Info className="w-3 h-3" style={{ color: '#0A810A' }} />
                </motion.button>
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: '#1A1A1A' }}>
                {coupon.course}
              </h3>
              <p className="text-sm mb-2" style={{ color: '#666' }}>
                {coupon.rateType || coupon.title}
              </p>
              <div className="flex items-center gap-1 text-sm" style={{ color: '#0A810A' }}>
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{coupon.distance}</span>
              </div>
            </div>

            {/* Logo */}
            <div className="w-16 h-16 flex-shrink-0 ml-3">
              <img 
                src={coupon.logo} 
                alt={coupon.course} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Date */}
          <div className="mb-3">
            <div 
              className="inline-block px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: '#F3F4F6', color: '#374151' }}
            >
              📅 {coupon.date}
            </div>
          </div>

          {/* Time & Price Row */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div 
              className="w-1 h-12 rounded-full"
              style={{ background: 'linear-gradient(180deg, #004D00 0%, #0A810A 100%)' }}
            />
            <div className="flex-1">
              <div className="text-sm font-medium mb-0.5" style={{ color: '#666' }}>
                {coupon.timeSlot}
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              className="font-bold text-4xl"
              style={{ 
                color: '#0A810A',
                textShadow: '0 2px 8px rgba(10, 129, 10, 0.2)'
              }}
            >
              {coupon.price}
            </motion.div>
          </div>

          {/* Redeem Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-full py-3 rounded-xl font-bold text-white text-sm tracking-wide"
            style={{ 
              background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)',
              boxShadow: '0 4px 12px rgba(10, 129, 10, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
          >
            REDEEM
          </motion.button>
        </div>
      </motion.div>

      {/* Info Modal - Bottom Sheet Style */}
      <AnimatePresence>
        {showInfo && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfo(false)}
              className="fixed inset-0 bg-black/50 z-50"
              style={{ backdropFilter: 'blur(4px)' }}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#004D00' }}>
                    {coupon.course}
                  </h3>
                  <p className="text-sm" style={{ color: '#666' }}>
                    {coupon.rateType || coupon.title}
                  </p>
                </div>
                <motion.button
                  onClick={() => setShowInfo(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center ml-3"
                  style={{ background: '#F3F4F6' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" style={{ color: '#666' }} />
                </motion.button>
              </div>

              {coupon.description && (
                <p className="text-sm mb-6" style={{ color: '#666', lineHeight: '1.6' }}>
                  {coupon.description}
                </p>
              )}

              <div className="space-y-3">
                {coupon.contact && (
                  <motion.a
                    href={`tel:${coupon.contact}`}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: '#F0FDF4' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#0A810A' }}>
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium mb-0.5" style={{ color: '#666' }}>Call Us</div>
                      <div className="font-semibold" style={{ color: '#0A810A' }}>{coupon.contact}</div>
                    </div>
                  </motion.a>
                )}

                {coupon.website && (
                  <motion.a
                    href={`https://${coupon.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: '#F0FDF4' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#0A810A' }}>
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium mb-0.5" style={{ color: '#666' }}>Visit Website</div>
                      <div className="font-semibold" style={{ color: '#0A810A' }}>{coupon.website}</div>
                    </div>
                  </motion.a>
                )}

                <motion.button
                  className="flex items-center gap-3 p-4 rounded-xl w-full"
                  style={{ background: '#F0FDF4' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#0A810A' }}>
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs font-medium mb-0.5" style={{ color: '#666' }}>Navigate</div>
                    <div className="font-semibold" style={{ color: '#0A810A' }}>Get Directions</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}