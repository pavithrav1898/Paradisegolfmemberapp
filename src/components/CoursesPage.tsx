import React, { useState } from 'react';
import { Filter, X, Check, Search, ChevronDown, MapPin, Clock, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRedemption } from './RedemptionContext';
import logoImage from 'figma:asset/031ce25280a33be431a1b80f73e3d61c67c1b442.png';
import saddlebrookLogo from 'figma:asset/7890bff248f1200d8ca110200f4f3dd539b573aa.png';
import heritageIslesLogo from 'figma:asset/980e61a3fd38a4788ddb0f09d51481c8cb9f765e.png';
import brooksvilleLogo from 'figma:asset/89a8f9f8747d7d514746043d7b7951b4700ee5b1.png';
import citrusNationalLogo from 'figma:asset/b414c97515652b1781a12302e59e1bcbe8d93091.png';
import hernandoOaksLogo from 'figma:asset/1213a1ad133cd81a63ee257035bfe4754c08079f.png';
import eaglesGolfLogo from 'figma:asset/a87254104b76654c333ac8fe07b9067f57f31804.png';

interface Coupon {
  id: string;
  type: string;
  courseName: string;
  distance: string;
  distanceValue: number;
  rateType: string;
  logo: string;
  contact: string;
  website: string;
  description: string;
  date: string;
  timeRange: string;
  price: string;
  priceValue: number;
  validFrom: string;
  validTo: string;
  city: string;
}

export default function CoursesPage() {
  const { redeemedCoupons, addRedeemedCoupon } = useRedemption();
  
  // Filter states
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedDistance, setSelectedDistance] = useState<string>('15+ mi');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [priceSort, setPriceSort] = useState<'low-high' | 'high-low' | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Modal states
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilterSheet, setActiveFilterSheet] = useState<string | null>(null);
  const [showRedeemConfirm, setShowRedeemConfirm] = useState<Coupon | null>(null);
  const [showRedeemSuccess, setShowRedeemSuccess] = useState<{
    coupon: Coupon;
    redemptionId: string;
    redemptionTime: number;
    expiryTime: number;
  } | null>(null);

  const coupons: Coupon[] = [
    {
      id: '1',
      type: 'Double Eagle',
      courseName: 'Saddlebrook Resort',
      distance: '1.5 mi',
      distanceValue: 1.5,
      rateType: 'Pre-season Card Rates',
      logo: saddlebrookLogo,
      contact: '(352) 555-0100',
      website: 'www.saddlebrook.com',
      description: 'Championship 18-hole course featuring water hazards and scenic views.',
      date: 'Dec 19, 2025',
      timeRange: '7:00 AM - 11:00 AM',
      price: '$45',
      priceValue: 45,
      validFrom: '11/01/2025',
      validTo: '12/31/2025',
      city: 'Wesley Chapel'
    },
    {
      id: '2',
      type: 'Member for a Day',
      courseName: 'Heritage Isles Golf & CC',
      distance: '2.1 mi',
      distanceValue: 2.1,
      rateType: 'Member Day Access',
      logo: heritageIslesLogo,
      contact: '(352) 555-0200',
      website: 'www.heritageisles.com',
      description: 'Experience luxury golf with pristine fairways and exclusive clubhouse access.',
      date: 'Dec 19, 2025',
      timeRange: '7:00 AM - 6:00 PM',
      price: '$0',
      priceValue: 0,
      validFrom: '01/01/2026',
      validTo: '03/31/2026',
      city: 'Brooksville'
    },
    {
      id: '3',
      type: 'Discount Card',
      courseName: 'Hernando Oaks Golf Club',
      distance: '0.8 mi',
      distanceValue: 0.8,
      rateType: 'Peak Season Card Rates',
      logo: hernandoOaksLogo,
      contact: '(352) 555-0300',
      website: 'www.hernandooaks.com',
      description: 'Tree-lined fairways and challenging greens make this a local favorite.',
      date: 'Dec 19, 2025',
      timeRange: '7:00 AM - 7:00 PM',
      price: '$54',
      priceValue: 54,
      validFrom: '12/01/2025',
      validTo: '02/28/2026',
      city: 'Spring Hill'
    },
    {
      id: '4',
      type: 'Complimentary Round',
      courseName: 'Heritage Isles Golf & CC',
      distance: '2.1 mi',
      distanceValue: 2.1,
      rateType: 'Platinum Member Benefit',
      logo: heritageIslesLogo,
      contact: '(352) 555-0200',
      website: 'www.heritageisles.com',
      description: 'Exclusive platinum member perk - enjoy a complimentary round.',
      date: 'Dec 19, 2025',
      timeRange: '7:00 AM - 11:00 PM',
      price: '$0',
      priceValue: 0,
      validFrom: '11/01/2025',
      validTo: '12/24/2025',
      city: 'Brooksville'
    },
    {
      id: '5',
      type: 'Discount Card',
      courseName: 'Brooksville Country Club',
      distance: '3.2 mi',
      distanceValue: 3.2,
      rateType: 'Season Membership',
      logo: brooksvilleLogo,
      contact: '(352) 555-0400',
      website: 'www.brooksvillecc.com',
      description: 'Full season access to premium facilities including driving range.',
      date: 'Dec 19, 2025',
      timeRange: 'All Day Access',
      price: '$89',
      priceValue: 89,
      validFrom: '11/01/2025',
      validTo: '04/30/2026',
      city: 'Brooksville'
    },
    {
      id: '6',
      type: 'Double Eagle',
      courseName: 'Citrus National Golf Club',
      distance: '4.5 mi',
      distanceValue: 4.5,
      rateType: 'Pre-season Special Rates',
      logo: citrusNationalLogo,
      contact: '(352) 555-0500',
      website: 'www.citrusnational.com',
      description: 'Join our annual championship tournament with prizes and networking.',
      date: 'Dec 19, 2025',
      timeRange: '8:00 AM - 12:00 PM',
      price: '$52',
      priceValue: 52,
      validFrom: '03/01/2026',
      validTo: '03/15/2026',
      city: 'Wesley Chapel'
    },
    {
      id: '7',
      type: 'Member for a Day',
      courseName: 'Eagles Golf Club',
      distance: '5.0 mi',
      distanceValue: 5.0,
      rateType: 'Guest Member Access',
      logo: eaglesGolfLogo,
      contact: '(352) 555-0600',
      website: 'www.eaglesgolf.com',
      description: 'One-time special rate for new players with award-winning design.',
      date: 'Dec 19, 2025',
      timeRange: '7:00 AM - 7:00 PM',
      price: '$0',
      priceValue: 0,
      validFrom: '01/15/2026',
      validTo: '02/15/2026',
      city: 'Spring Hill'
    }
  ];

  const couponTypes = ['Member for a Day', 'Double Eagle', 'Discount Card', 'Complimentary Round'];
  const allCourses = Array.from(new Set(coupons.map(c => c.courseName)));
  const allCities = ['All', ...Array.from(new Set(coupons.map(c => c.city)))];
  const distanceOptions = ['5 mi', '10 mi', '15 mi', '15+ mi'];
  const timeOptions = [
    '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM',
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
  ];

  // Filter logic
  const getFilteredCoupons = () => {
    let filtered = [...coupons];

    if (selectedCourses.length > 0) {
      filtered = filtered.filter(c => selectedCourses.includes(c.courseName));
    }
    if (selectedCity !== 'All') {
      filtered = filtered.filter(c => c.city === selectedCity);
    }
    if (selectedDistance !== '15+ mi') {
      const maxDistance = parseFloat(selectedDistance);
      filtered = filtered.filter(c => c.distanceValue <= maxDistance);
    }
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(c => selectedTypes.includes(c.type));
    }
    if (priceSort === 'low-high') {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else if (priceSort === 'high-low') {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    }

    return filtered;
  };

  const filteredCoupons = getFilteredCoupons();

  const getCouponTypeColor = (type: string) => {
    switch(type) {
      case 'Discount Card': return { bg: '#FEF3C7', text: '#B45309' };
      case 'Complimentary Round': return { bg: '#D1FAE5', text: '#065F46' };
      case 'Member for a Day': return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Double Eagle': return { bg: '#E0E7FF', text: '#4338CA' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const isRedeemed = (couponId: string) => {
    return redeemedCoupons.some(r => r.id === couponId);
  };

  const handleRedeem = (coupon: Coupon) => {
    setShowRedeemConfirm(coupon);
  };

  const confirmRedeem = () => {
    if (!showRedeemConfirm) return;

    const redemptionId = `RDM${Date.now().toString().slice(-8)}`;
    const redemptionTime = Date.now();
    const expiryTime = redemptionTime + (24 * 60 * 60 * 1000);

    addRedeemedCoupon({
      id: showRedeemConfirm.id,
      redemptionId,
      redemptionTime,
      expiryTime
    });

    setShowRedeemSuccess({
      coupon: showRedeemConfirm,
      redemptionId,
      redemptionTime,
      expiryTime
    });

    setShowRedeemConfirm(null);
  };

  const activeFilterCount = () => {
    let count = 0;
    if (selectedCourses.length > 0) count++;
    if (selectedCity !== 'All') count++;
    if (selectedDistance !== '15+ mi') count++;
    if (selectedTime) count++;
    if (priceSort) count++;
    if (selectedTypes.length > 0) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          <img src={logoImage} alt="Paradise Golf" className="h-8" />
          <h1 className="text-2xl font-bold" style={{ color: '#004D00' }}>Courses</h1>
          <motion.button
            onClick={() => setShowFilters(true)}
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)' }}
            whileTap={{ scale: 0.9 }}
          >
            <Filter className="w-5 h-5 text-white" />
            {activeFilterCount() > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: '#DC2626' }}
              >
                {activeFilterCount()}
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredCoupons.map((coupon, index) => {
            const colors = getCouponTypeColor(coupon.type);
            const redeemed = isRedeemed(coupon.id);

            return (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="p-3">
                  {/* Type Badge */}
                  <div
                    className="inline-block px-2 py-1 rounded-lg text-xs font-bold mb-2"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    {coupon.type}
                  </div>

                  {/* Logo */}
                  <div className="w-12 h-12 mb-2">
                    <img src={coupon.logo} alt={coupon.courseName} className="w-full h-full object-contain" />
                  </div>

                  {/* Course Name */}
                  <h3 className="font-bold text-sm mb-1 line-clamp-2" style={{ color: '#1A1A1A' }}>
                    {coupon.courseName}
                  </h3>

                  {/* Distance */}
                  <div className="flex items-center gap-1 text-xs mb-2" style={{ color: '#0A810A' }}>
                    <MapPin className="w-3 h-3" />
                    <span className="font-medium">{coupon.distance}</span>
                  </div>

                  {/* Date & Time */}
                  <div className="text-xs mb-1" style={{ color: '#666' }}>📅 {coupon.date}</div>
                  <div className="text-xs mb-3" style={{ color: '#666' }}>🕐 {coupon.timeRange}</div>

                  {/* Price */}
                  <div className="text-3xl font-bold mb-3" style={{ color: '#0A810A' }}>
                    {coupon.price}
                  </div>

                  {/* Button */}
                  <motion.button
                    onClick={() => redeemed ? null : handleRedeem(coupon)}
                    disabled={redeemed}
                    className="w-full py-2.5 rounded-xl font-bold text-sm"
                    style={{
                      background: redeemed ? '#DC2626' : 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)',
                      color: '#FFFFFF'
                    }}
                    whileTap={redeemed ? {} : { scale: 0.98 }}
                  >
                    {redeemed ? 'REDEEMED' : 'REDEEM'}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Filters Bottom Sheet - Placeholder for now */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#004D00' }}>Filters</h3>
                <p className="text-sm" style={{ color: '#666' }}>Filter functionality coming soon...</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
