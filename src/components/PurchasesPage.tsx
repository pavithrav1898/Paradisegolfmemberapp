import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { useRedemption } from './RedemptionContext';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/031ce25280a33be431a1b80f73e3d61c67c1b442.png';
import saddlebrookLogo from 'figma:asset/7890bff248f1200d8ca110200f4f3dd539b573aa.png';
import heritageIslesLogo from 'figma:asset/980e61a3fd38a4788ddb0f09d51481c8cb9f765e.png';
import brooksvilleLogo from 'figma:asset/89a8f9f8747d7d514746043d7b7951b4700ee5b1.png';

export default function PurchasesPage() {
  const navigate = useNavigate();
  const { redeemedCoupons = [] } = useRedemption();
  const [timers, setTimers] = useState<Record<string, string>>({});

  // Mock coupon data for display
  const couponData: Record<string, any> = {
    '1': {
      title: 'Double Eagle Pre-Season',
      course: 'Saddlebrook Resort',
      logo: saddlebrookLogo,
      type: 'DOUBLE EAGLE',
      distance: '1.5 mi',
      timeSlot: '7:00 AM - 11:00 AM',
      price: '$45'
    },
    '2': {
      title: 'Member for a Day',
      course: 'Heritage Isles Golf & CC',
      logo: heritageIslesLogo,
      type: 'MEMBER FOR A DAY',
      distance: '2.1 mi',
      timeSlot: '7:00 AM - 11:00 AM',
      price: '$0'
    },
    '3': {
      title: 'Peak Season Cool Rates',
      course: 'Hernando Oaks Golf Club',
      logo: brooksvilleLogo,
      type: 'DISCOUNT CARD',
      distance: '0.8 mi',
      timeSlot: '7:00 AM - 11:00 AM',
      price: '$54'
    },
    '4': {
      title: 'Complimentary Round',
      course: 'Heritage Isles Golf & CC',
      logo: heritageIslesLogo,
      type: 'COMPLIMENTARY ROUND',
      distance: '2.1 mi',
      timeSlot: '7:00 AM - 11:00 AM',
      price: '$0'
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers: Record<string, string> = {};
      redeemedCoupons.forEach(redemption => {
        const remaining = redemption.expiryTime - Date.now();
        if (remaining > 0) {
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          newTimers[redemption.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [redeemedCoupons]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logoImage} alt="Paradise Golf" className="h-8" />
            <h1 className="text-xl font-bold" style={{ color: '#004D00' }}>
              Active Purchases
            </h1>
            <div className="w-8" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {redeemedCoupons.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#004D00' }}>
              No Active Purchases
            </h3>
            <p className="text-gray-600 mb-6">
              Redeemed coupons will appear here
            </p>
            <button
              onClick={() => navigate('/coupons')}
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{ background: '#0A810A' }}
            >
              Browse Coupons
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {redeemedCoupons.map((redemption, index) => {
              const coupon = couponData[redemption.id];
              if (!coupon) return null;

              return (
                <motion.div
                  key={redemption.redemptionId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  {/* Countdown Timer Banner */}
                  <div 
                    className="px-4 py-3 flex items-center justify-between"
                    style={{ background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)' }}
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Tee Time Expires in</span>
                    </div>
                    <div className="text-white font-bold text-lg font-mono">
                      {timers[redemption.id] || '00:00:00'}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <div className="flex gap-3 mb-3">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={coupon.logo} 
                          alt={coupon.course} 
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <div 
                          className="inline-block px-2 py-1 rounded-full text-xs font-bold text-white mb-2"
                          style={{ background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)' }}
                        >
                          {coupon.type}
                        </div>
                        <h3 className="font-bold text-base mb-1" style={{ color: '#004D00' }}>
                          {coupon.title}
                        </h3>
                        <p className="text-sm text-gray-600">{coupon.course}</p>
                      </div>

                      <div className="text-right">
                        <div 
                          className="font-bold text-2xl"
                          style={{ color: coupon.price === '$0' ? '#0A810A' : '#004D00' }}
                        >
                          {coupon.price}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" style={{ color: '#0A810A' }} />
                        <span>{coupon.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" style={{ color: '#0A810A' }} />
                        <span>{coupon.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" style={{ color: '#0A810A' }} />
                        <span>{new Date(redemption.redemptionTime).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-600 mb-1">Redemption ID</div>
                      <div className="font-mono font-bold" style={{ color: '#004D00' }}>
                        {redemption.redemptionId}
                      </div>
                    </div>

                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                      <strong>Note:</strong> Show this screen to the staff at the golf course to redeem your coupon.
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}