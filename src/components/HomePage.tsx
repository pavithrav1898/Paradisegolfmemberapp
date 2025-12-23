import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, Gift, Info, Trophy, Clock, Zap, User, Calendar } from 'lucide-react';
import { useLocation } from './LocationContext';
import { motion, useScroll, useTransform } from 'motion/react';
import CouponCard from './CouponCard';
import TournamentCard from './TournamentCard';
import { tournaments } from '../data/tournaments';
import logoImage from 'figma:asset/031ce25280a33be431a1b80f73e3d61c67c1b442.png';
import saddlebrookLogo from 'figma:asset/7890bff248f1200d8ca110200f4f3dd539b573aa.png';
import heritageIslesLogo from 'figma:asset/980e61a3fd38a4788ddb0f09d51481c8cb9f765e.png';
import brooksvilleLogo from 'figma:asset/89a8f9f8747d7d514746043d7b7951b4700ee5b1.png';
import citrusNationalLogo from 'figma:asset/b414c97515652b1781a12302e59e1bcbe8d93091.png';
import memberCardBg from 'figma:asset/4d6a4f789ba0e2efa25678fc0b16ae88951c138b.png';

// Count-up animation hook
function useCountUp(end: number, duration: number = 600) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return count;
}

export default function HomePage() {
  const navigate = useNavigate();
  const { location } = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const cardY = useTransform(scrollY, [0, 300], [0, -50]);
  const cardOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const memberData = {
    name: 'PARVEEN RAI',
    memberId: 'GOLFER-300166',
    membershipType: 'PLATINUM',
    season: 'Winter Membership',
    validFrom: '11/01/2025',
    validTo: '04/30/2026',
    status: 'ACTIVE',
    backgroundImage: 'https://images.unsplash.com/photo-1605144884374-ecbb643615f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xmJTIwY291cnNlJTIwYWVyaWFsfGVufDF8fHx8MTc2NjA1NjkxMXww&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const nearbyDeals = [
    {
      id: '1',
      title: 'Double Eagle Pre-Season',
      course: 'Saddlebrook Resort',
      logo: saddlebrookLogo,
      price: '$45',
      date: 'Dec 19, 2025',
      timeSlot: '7:00 AM - 11:00 AM',
      type: 'Double Eagle',
      distance: '1.5 mi',
      rateType: 'Pre-season Card Rates',
      contact: '(352) 555-0100',
      website: 'www.saddlebrook.com',
      description: 'Championship 18-hole course featuring water hazards and scenic views. Perfect for all skill levels.'
    },
    {
      id: '2',
      title: 'Member for a Day',
      course: 'Heritage Isles Golf & CC',
      logo: heritageIslesLogo,
      price: '$0',
      date: 'Dec 19, 2025',
      timeSlot: '7:00 AM - 11:00 AM',
      type: 'Member for a Day',
      distance: '2.1 mi',
      image: heritageIslesLogo,
      rateType: 'Member Day Access',
      contact: '(352) 555-0200',
      website: 'www.heritageisles.com',
      description: 'Experience luxury golf with pristine fairways and exclusive clubhouse access for the day.'
    },
    {
      id: '3',
      title: 'Peak Season Cool Rates',
      course: 'Brooksville Country Club',
      logo: brooksvilleLogo,
      price: '$54',
      date: 'Dec 19, 2025',
      timeSlot: '7:00 AM - 11:00 AM',
      type: 'Discount Card',
      distance: '0.8 mi',
      rateType: 'Peak Season Card Rates',
      contact: '(352) 555-0400',
      website: 'www.brooksvillecc.com',
      description: 'Full season access to our premium facilities including driving range and putting greens.'
    },
    {
      id: '4',
      title: 'Complimentary Round',
      course: 'Heritage Isles Golf & CC',
      logo: heritageIslesLogo,
      price: '$0',
      date: 'Dec 19, 2025',
      timeSlot: '7:00 AM - 11:00 AM',
      type: 'Complimentary Round',
      distance: '2.1 mi',
      image: heritageIslesLogo,
      rateType: 'Platinum Member Benefit',
      contact: '(352) 555-0200',
      website: 'www.heritageisles.com',
      description: 'Exclusive platinum member perk - enjoy a complimentary round on our championship course.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      {/* Header with Profile Icon */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-sm sticky top-0 z-40 backdrop-blur-md bg-white/95"
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.img 
              src={logoImage} 
              alt="Paradise Golf" 
              className="h-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <div className="flex items-center gap-3">
              <motion.div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">{location}</span>
              </motion.div>
              
              {/* Profile Icon */}
              <motion.button
                onClick={() => navigate('/profile')}
                className="p-2 rounded-full"
                style={{ background: 'rgba(0, 77, 0, 0.1)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User className="w-5 h-5" style={{ color: '#004D00' }} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Membership Card - No Details Button */}
        <motion.div
          ref={cardRef}
          style={{ y: cardY, opacity: cardOpacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative"
        >
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-64">
              <img 
                src={memberCardBg} 
                alt="Member Card" 
                className="w-full h-full object-cover"
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 5 }}
              />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-black text-xs mb-1 font-medium">{memberData.season}</div>
                    <div className="text-black text-sm flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {memberData.validFrom} - {memberData.validTo}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-amber-400 text-amber-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  >
                    <Zap className="w-3 h-3" />
                    {memberData.status}
                  </motion.div>
                </div>

                <div>
                  <motion.div 
                    className="text-black text-2xl mb-1 font-bold tracking-wide"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {memberData.name}
                  </motion.div>
                  <motion.div 
                    className="text-black text-sm mb-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    ({memberData.memberId})
                  </motion.div>
                  <motion.div 
                    className="text-black text-4xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
                  >
                    {memberData.membershipType}
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.button
              className="w-full text-white py-4 text-center font-bold text-sm tracking-wide relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)' }}
              whileHover={{ boxShadow: '0 10px 30px rgba(10, 129, 10, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">UPGRADE MEMBERSHIP</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <StatsSection />

        {/* Nearby Deals - Renamed from Featured Offers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.h2 
                className="text-2xl font-bold"
                style={{ color: '#004D00' }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                Nearby Deals
              </motion.h2>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <MapPin className="w-3 h-3" style={{ color: '#0A810A' }} />
                <span>up to 5 miles</span>
              </div>
            </div>
            <motion.button 
              onClick={() => navigate('/coupons')}
              className="flex items-center gap-1 text-sm font-semibold"
              style={{ color: '#0A810A' }}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              See All
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4">
            {nearbyDeals.map((coupon, index) => (
              <div key={coupon.id} className="snap-center flex-shrink-0" style={{ width: 'calc(100vw - 48px)', maxWidth: '400px' }}>
                <CouponCard 
                  coupon={coupon} 
                  index={index} 
                  onClick={() => navigate(`/coupon/${coupon.id}`)} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tournaments Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <motion.h2 
              className="text-2xl font-bold"
              style={{ color: '#004D00' }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Tournaments
            </motion.h2>
            <motion.button 
              onClick={() => navigate('/tournaments')}
              className="flex items-center gap-1 text-sm font-semibold"
              style={{ color: '#0A810A' }}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              See All
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4">
            {tournaments.map((tournament, index) => (
              <div key={tournament.id} className="snap-center flex-shrink-0" style={{ width: '240px' }}>
                <TournamentCard 
                  tournament={tournament} 
                  index={index} 
                  onClick={() => navigate(`/tournament/${tournament.id}`)}
                  variant="home"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsSection() {
  const stats = [
    { label: 'Active Coupons', value: 12, icon: Gift, color: '#0A810A' },
    { label: 'Active Tournaments', value: 3, icon: Trophy, color: '#004D00' }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
}

function StatCard({ stat, index }: any) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, 800);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-4 shadow-lg relative overflow-hidden"
    >
      <div 
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5"
        style={{ background: stat.color, transform: 'translate(30%, -30%)' }}
      />
      
      <motion.div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 relative"
        style={{ backgroundColor: `${stat.color}15` }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-6 h-6" style={{ color: stat.color }} />
      </motion.div>
      <motion.div 
        className="text-3xl font-bold mb-1"
        style={{ color: stat.color }}
        key={count}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {count}
      </motion.div>
      <div className="text-xs text-gray-600 leading-tight font-medium">{stat.label}</div>
    </motion.div>
  );
}