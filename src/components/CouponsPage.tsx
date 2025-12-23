import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, ChevronDown, X, Info, Phone, Globe, Navigation, Clock, Check } from 'lucide-react';
import { useLocation } from './LocationContext';
import { useRedemption } from './RedemptionContext';
import { motion, AnimatePresence } from 'motion/react';
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

export default function CouponsPage() {
  const navigate = useNavigate();
  const { location } = useLocation();
  const { addRedeemedCoupon } = useRedemption();
  
  // Filter states
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedDistance, setSelectedDistance] = useState<string>('15+ mi');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [priceSort, setPriceSort] = useState<'low-high' | 'high-low' | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  // Modal states
  const [showCourseFilter, setShowCourseFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showDistanceFilter, setShowDistanceFilter] = useState(false);
  const [showTimeFilter, setShowTimeFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<Coupon | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<Coupon | null>(null);
  const [showRedeemedModal, setShowRedeemedModal] = useState<{
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
      description: 'Championship 18-hole course featuring water hazards and scenic views. Perfect for all skill levels.',
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
      description: 'Experience luxury golf with pristine fairways and exclusive clubhouse access for the day.',
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
      description: 'Tree-lined fairways and challenging greens make this a local favorite for serious golfers.',
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
      description: 'Exclusive platinum member perk - enjoy a complimentary round on our championship course.',
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
      description: 'Full season access to our premium facilities including driving range and putting greens.',
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
      description: 'Join our annual championship tournament. Prizes, refreshments, and networking included.',
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
      description: 'One-time special rate for new players. Experience our award-winning course design.',
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

    // Course filter
    if (selectedCourses.length > 0) {
      filtered = filtered.filter(c => selectedCourses.includes(c.courseName));
    }

    // City filter
    if (selectedCity !== 'All') {
      filtered = filtered.filter(c => c.city === selectedCity);
    }

    // Distance filter
    if (selectedDistance !== '15+ mi') {
      const maxDistance = parseFloat(selectedDistance);
      filtered = filtered.filter(c => c.distanceValue <= maxDistance);
    }

    // Type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(c => selectedTypes.includes(c.type));
    }

    // Time filter
    if (selectedTime) {
      filtered = filtered.filter(c => {
        const time = selectedTime;
        const range = c.timeRange;
        // Simple check - in production would parse time ranges properly
        return range.includes('All Day') || range.length > 0;
      });
    }

    // Price sort
    if (priceSort === 'low-high') {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else if (priceSort === 'high-low') {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    }

    return filtered;
  };

  const filteredCoupons = getFilteredCoupons();

  const toggleCourseSelection = (course: string) => {
    setSelectedCourses(prev =>
      prev.includes(course)
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  const toggleTypeSelection = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleRedeem = (coupon: Coupon) => {
    setShowConfirmModal(coupon);
  };

  const confirmRedeem = () => {
    if (!showConfirmModal) return;

    const redemptionId = `RDM${Date.now().toString().slice(-8)}`;
    const redemptionTime = Date.now();
    const expiryTime = redemptionTime + (24 * 60 * 60 * 1000); // 24 hours

    addRedeemedCoupon({
      id: showConfirmModal.id,
      redemptionId,
      redemptionTime,
      expiryTime
    });

    setShowRedeemedModal({
      coupon: showConfirmModal,
      redemptionId,
      redemptionTime,
      expiryTime
    });

    setShowConfirmModal(null);
  };

  const activeFilterCount = () => {
    let count = 0;
    if (selectedCourses.length > 0) count++;
    if (selectedCity !== 'All') count++;
    if (selectedDistance !== '15+ mi') count++;
    if (selectedTime) count++;
    if (priceSort) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logoImage} alt="Paradise Golf" className="h-8" />
            <h1 className="text-2xl font-bold" style={{ color: '#004D00' }}>Coupons</h1>
            <div className="w-8" />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-4 pb-3 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {/* Course Filter */}
            <motion.button
              onClick={() => setShowCourseFilter(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all"
              style={{
                background: selectedCourses.length > 0 
                  ? 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)'
                  : '#F3F4F6',
                color: selectedCourses.length > 0 ? '#FFFFFF' : '#374151',
                boxShadow: selectedCourses.length > 0 ? '0 0 0 2px rgba(10, 129, 10, 0.3)' : 'none'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              <span>Course{selectedCourses.length > 0 && ` (${selectedCourses.length})`}</span>
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            {/* Location Filter */}
            <motion.button
              onClick={() => setShowLocationFilter(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all"
              style={{
                background: selectedCity !== 'All'
                  ? 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)'
                  : '#F3F4F6',
                color: selectedCity !== 'All' ? '#FFFFFF' : '#374151',
                boxShadow: selectedCity !== 'All' ? '0 0 0 2px rgba(10, 129, 10, 0.3)' : 'none'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-4 h-4" />
              <span>{selectedCity === 'All' ? 'Location' : selectedCity}</span>
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            {/* Distance Filter */}
            <motion.button
              onClick={() => setShowDistanceFilter(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all"
              style={{
                background: selectedDistance !== '15+ mi'
                  ? 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)'
                  : '#F3F4F6',
                color: selectedDistance !== '15+ mi' ? '#FFFFFF' : '#374151',
                boxShadow: selectedDistance !== '15+ mi' ? '0 0 0 2px rgba(10, 129, 10, 0.3)' : 'none'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation className="w-4 h-4" />
              <span>Nearby {selectedDistance !== '15+ mi' ? `(${selectedDistance})` : ''}</span>
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            {/* Time Filter */}
            <motion.button
              onClick={() => setShowTimeFilter(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all"
              style={{
                background: selectedTime
                  ? 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)'
                  : '#F3F4F6',
                color: selectedTime ? '#FFFFFF' : '#374151',
                boxShadow: selectedTime ? '0 0 0 2px rgba(10, 129, 10, 0.3)' : 'none'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Clock className="w-4 h-4" />
              <span>{selectedTime || 'Time'}</span>
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            {/* Price Filter */}
            <motion.button
              onClick={() => setShowPriceFilter(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all"
              style={{
                background: priceSort
                  ? 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)'
                  : '#F3F4F6',
                color: priceSort ? '#FFFFFF' : '#374151',
                boxShadow: priceSort ? '0 0 0 2px rgba(10, 129, 10, 0.3)' : 'none'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>
                {priceSort === 'low-high' ? 'Price: Low → High' : 
                 priceSort === 'high-low' ? 'Price: High → Low' : 
                 'Price'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Type Tabs */}
        <div className="px-4 pb-3 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {couponTypes.map(type => (
              <motion.button
                key={type}
                onClick={() => toggleTypeSelection(type)}
                className="px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all"
                style={{
                  background: selectedTypes.includes(type)
                    ? 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)'
                    : '#FFFFFF',
                  color: selectedTypes.includes(type) ? '#FFFFFF' : '#374151',
                  border: selectedTypes.includes(type) ? 'none' : '1px solid #E5E7EB',
                  boxShadow: selectedTypes.includes(type) ? '0 4px 12px rgba(10, 129, 10, 0.25)' : 'none'
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: '#004D00' }}>
            Available Coupons
          </h2>
          <span className="text-gray-600 text-sm font-medium">
            {filteredCoupons.length} {filteredCoupons.length === 1 ? 'coupon' : 'coupons'}
          </span>
        </div>

        {/* Coupon Cards */}
        <div className="space-y-4">
          {filteredCoupons.map((coupon, index) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              index={index}
              onInfo={() => setShowInfoModal(coupon)}
              onRedeem={() => handleRedeem(coupon)}
            />
          ))}
        </div>

        {filteredCoupons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#004D00' }}>
              No Coupons Found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>

      {/* Course Filter Bottom Sheet */}
      <BottomSheet
        isOpen={showCourseFilter}
        onClose={() => setShowCourseFilter(false)}
        title="Select Golf Course"
        showReset={selectedCourses.length > 0}
        onReset={() => setSelectedCourses([])}
      >
        <div className="mb-4 flex gap-2">
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder="Search Location"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base"
              style={{ color: '#9CA3AF' }}
            />
            <Search className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          </div>
          <button className="px-4 py-3 rounded-xl border border-gray-300 font-bold" style={{ color: '#374151' }}>
            A-Z
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {allCourses.map(course => (
            <motion.button
              key={course}
              onClick={() => toggleCourseSelection(course)}
              className="flex items-center gap-2 p-3 rounded-xl transition-all text-left"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                style={{ 
                  borderColor: selectedCourses.includes(course) ? '#0A810A' : '#D1D5DB',
                  background: selectedCourses.includes(course) ? '#0A810A' : 'transparent'
                }}
              >
                {selectedCourses.includes(course) && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
              <span className="text-sm font-medium" style={{ color: '#374151' }}>
                {course.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>
        <motion.button
          onClick={() => setShowCourseFilter(false)}
          className="w-full mt-4 py-4 rounded-xl font-bold text-white"
          style={{ background: '#004D00' }}
          whileTap={{ scale: 0.98 }}
        >
          APPLY
        </motion.button>
      </BottomSheet>

      {/* Location Filter Bottom Sheet */}
      <BottomSheet
        isOpen={showLocationFilter}
        onClose={() => setShowLocationFilter(false)}
        title="Select Course Location"
        showReset={selectedCity !== 'All'}
        onReset={() => setSelectedCity('All')}
      >
        <div className="mb-4 flex gap-2">
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder="Search Location"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base"
              style={{ color: '#9CA3AF' }}
            />
            <Search className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          </div>
          <button className="px-4 py-3 rounded-xl border border-gray-300 font-bold" style={{ color: '#374151' }}>
            A-Z
          </button>
          <button 
            className="px-4 py-3 rounded-xl border-2 font-bold whitespace-nowrap"
            style={{ borderColor: '#0A810A', color: '#0A810A', background: '#F0FDF4' }}
          >
            CURRENT LOCATION
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {allCities.filter(c => c !== 'All').map(city => (
            <motion.button
              key={city}
              onClick={() => {
                setSelectedCity(city);
              }}
              className="flex items-center gap-2 p-3 rounded-xl transition-all text-left"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                style={{ 
                  borderColor: selectedCity === city ? '#0A810A' : '#D1D5DB',
                  background: selectedCity === city ? '#0A810A' : 'transparent'
                }}
              >
                {selectedCity === city && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
              <span className="text-sm font-medium" style={{ color: '#374151' }}>
                {city}
              </span>
            </motion.button>
          ))}
        </div>
        <motion.button
          onClick={() => setShowLocationFilter(false)}
          className="w-full mt-4 py-4 rounded-xl font-bold text-white"
          style={{ background: '#004D00' }}
          whileTap={{ scale: 0.98 }}
        >
          APPLY
        </motion.button>
      </BottomSheet>

      {/* Time Filter Bottom Sheet */}
      <BottomSheet
        isOpen={showTimeFilter}
        onClose={() => setShowTimeFilter(false)}
        title="Select Time"
      >
        <div className="grid grid-cols-2 gap-2">
          {timeOptions.map(time => (
            <motion.button
              key={time}
              onClick={() => {
                setSelectedTime(time);
                setShowTimeFilter(false);
              }}
              className="p-4 rounded-xl font-medium transition-all"
              style={{
                background: selectedTime === time ? '#F0FDF4' : '#FFFFFF',
                border: selectedTime === time ? '2px solid #0A810A' : '1px solid #E5E7EB',
                color: selectedTime === time ? '#0A810A' : '#374151'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {time}
            </motion.button>
          ))}
        </div>
        {selectedTime && (
          <motion.button
            onClick={() => {
              setSelectedTime('');
              setShowTimeFilter(false);
            }}
            className="w-full mt-4 p-4 rounded-xl font-medium"
            style={{ background: '#FEE2E2', color: '#DC2626' }}
            whileTap={{ scale: 0.98 }}
          >
            Clear Time Filter
          </motion.button>
        )}
      </BottomSheet>

      {/* Distance Filter Bottom Sheet */}
      <BottomSheet
        isOpen={showDistanceFilter}
        onClose={() => setShowDistanceFilter(false)}
        title="Select Distance"
        showReset={selectedDistance !== '15+ mi'}
        onReset={() => setSelectedDistance('15+ mi')}
      >
        <div className="grid grid-cols-2 gap-3">
          {distanceOptions.map(distance => (
            <motion.button
              key={distance}
              onClick={() => {
                setSelectedDistance(distance);
                setShowDistanceFilter(false);
              }}
              className="p-4 rounded-xl font-medium transition-all"
              style={{
                background: selectedDistance === distance ? '#F0FDF4' : '#FFFFFF',
                border: selectedDistance === distance ? '2px solid #0A810A' : '1px solid #E5E7EB',
                color: selectedDistance === distance ? '#0A810A' : '#374151'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {distance}
            </motion.button>
          ))}
        </div>
      </BottomSheet>

      {/* Price Filter Bottom Sheet */}
      <BottomSheet
        isOpen={showPriceFilter}
        onClose={() => setShowPriceFilter(false)}
        title="Sort by Price"
        showReset={priceSort !== null}
        onReset={() => setPriceSort(null)}
      >
        <div className="space-y-3">
          <motion.button
            onClick={() => {
              setPriceSort('low-high');
              setShowPriceFilter(false);
            }}
            className="w-full p-4 rounded-xl font-medium transition-all text-left"
            style={{
              background: priceSort === 'low-high' ? '#F0FDF4' : '#FFFFFF',
              border: priceSort === 'low-high' ? '2px solid #0A810A' : '1px solid #E5E7EB',
              color: priceSort === 'low-high' ? '#0A810A' : '#374151'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Price: Low to High
          </motion.button>
          <motion.button
            onClick={() => {
              setPriceSort('high-low');
              setShowPriceFilter(false);
            }}
            className="w-full p-4 rounded-xl font-medium transition-all text-left"
            style={{
              background: priceSort === 'high-low' ? '#F0FDF4' : '#FFFFFF',
              border: priceSort === 'high-low' ? '2px solid #0A810A' : '1px solid #E5E7EB',
              color: priceSort === 'high-low' ? '#0A810A' : '#374151'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Price: High to Low
          </motion.button>
        </div>
      </BottomSheet>

      {/* Info Modal */}
      <InfoModal
        coupon={showInfoModal}
        onClose={() => setShowInfoModal(null)}
      />

      {/* Confirm Redemption Modal */}
      <ConfirmModal
        coupon={showConfirmModal}
        onConfirm={confirmRedeem}
        onCancel={() => setShowConfirmModal(null)}
      />

      {/* Redeemed Modal */}
      <RedeemedModal
        data={showRedeemedModal}
        onClose={() => setShowRedeemedModal(null)}
        onViewPurchases={() => {
          setShowRedeemedModal(null);
          navigate('/purchases');
        }}
      />
    </div>
  );
}

function CouponCard({ coupon, index, onInfo, onRedeem }: {
  coupon: Coupon;
  index: number;
  onInfo: () => void;
  onRedeem: () => void;
}) {
  const getCouponTypeColor = (type: string) => {
    switch(type) {
      case 'Discount Card':
      case 'Use Once Only':
        return '#F4A000';
      case 'Complimentary Round':
      case 'Member for a Day':
        return '#0A810A';
      case 'Tournament':
        return '#DC2626';
      case 'Member Card':
        return '#8B5CF6';
      default:
        return '#004D00';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden"
      style={{ 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 77, 0, 0.1)'
      }}
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
                  onInfo();
                }}
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: '#F3F4F6' }}
                whileTap={{ scale: 0.9 }}
              >
                <Info className="w-3 h-3" style={{ color: '#0A810A' }} />
              </motion.button>
            </div>
            <h3 className="font-bold text-lg mb-1" style={{ color: '#1A1A1A' }}>
              {coupon.courseName}
            </h3>
            <p className="text-sm mb-2" style={{ color: '#666' }}>
              {coupon.rateType}
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
              alt={coupon.courseName} 
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
              {coupon.timeRange}
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

        {/* Valid Dates */}
        <div className="text-xs mb-3" style={{ color: '#9CA3AF' }}>
          Valid: {coupon.validFrom} - {coupon.validTo}
        </div>

        {/* Redeem Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onRedeem();
          }}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide"
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
  );
}

function BottomSheet({ isOpen, onClose, title, children, showReset, onReset }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showReset?: boolean;
  onReset?: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
            style={{ backdropFilter: 'blur(4px)' }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <motion.button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#F3F4F6' }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" style={{ color: '#666' }} />
              </motion.button>
              <h3 className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
                {title}
              </h3>
              {showReset && onReset ? (
                <motion.button
                  onClick={onReset}
                  className="font-bold"
                  style={{ color: '#0A810A' }}
                  whileTap={{ scale: 0.95 }}
                >
                  RESET
                </motion.button>
              ) : (
                <div className="w-10" />
              )}
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoModal({ coupon, onClose }: {
  coupon: Coupon | null;
  onClose: () => void;
}) {
  if (!coupon) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex items-end"
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-white rounded-t-3xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-1" style={{ color: '#004D00' }}>
                {coupon.courseName}
              </h3>
              <p className="text-sm" style={{ color: '#666' }}>
                {coupon.rateType}
              </p>
            </div>
            <motion.button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center ml-3"
              style={{ background: '#F3F4F6' }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" style={{ color: '#666' }} />
            </motion.button>
          </div>

          <p className="text-sm mb-6" style={{ color: '#666', lineHeight: '1.6' }}>
            {coupon.description}
          </p>

          <div className="space-y-3">
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
      </motion.div>
    </AnimatePresence>
  );
}

function ConfirmModal({ coupon, onConfirm, onCancel }: {
  coupon: Coupon | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!coupon) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(8px)' }}
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-8 max-w-lg w-full"
        >
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-3 text-center" style={{ color: '#1A1A1A' }}>
              Confirm Redemption
            </h3>
            <p className="text-lg text-center mb-2" style={{ color: '#374151' }}>
              Are you sure you want to redeem this Coupon?
            </p>
            <p className="text-sm text-center font-medium" style={{ color: '#DC2626' }}>
              *This action cannot be undone.
            </p>
          </div>

          <div className="space-y-3 mb-6 p-5 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #D1FAE5' }}>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#0A810A' }} />
              <span className="text-base" style={{ color: '#374151' }}>Single Use Only</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#0A810A' }} />
              <span className="text-base" style={{ color: '#374151' }}>Redemption will be time-stamped and logged</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#0A810A' }} />
              <span className="text-base" style={{ color: '#374151' }}>Staff may usually verify the USED Screen</span>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={onCancel}
              className="flex-1 py-4 rounded-xl font-semibold"
              style={{ background: '#E5E7EB', color: '#6B7280' }}
              whileTap={{ scale: 0.98 }}
            >
              cancel
            </motion.button>
            <motion.button
              onClick={onConfirm}
              className="flex-1 py-4 rounded-xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)' }}
              whileTap={{ scale: 0.98 }}
            >
              Yes, Redeem Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function RedeemedModal({ data, onClose, onViewPurchases }: {
  data: { coupon: Coupon; redemptionId: string; redemptionTime: number; expiryTime: number } | null;
  onClose: () => void;
  onViewPurchases: () => void;
}) {
  const [timeLeft, setTimeLeft] = React.useState<string>('');

  React.useEffect(() => {
    if (!data) return;

    const updateTimer = () => {
      const remaining = data.expiryTime - Date.now();
      if (remaining <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-3xl p-6 max-w-sm w-full"
        >
          {/* Success Animation */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)' }}
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Check className="w-10 h-10" style={{ color: '#0A810A' }} strokeWidth={3} />
              </motion.div>
            </motion.div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#0A810A' }}>
              Successfully Redeemed!
            </h3>
            <p className="text-sm" style={{ color: '#666' }}>
              Your coupon has been activated
            </p>
          </div>

          {/* Coupon Info */}
          <div className="mb-6 p-4 rounded-2xl" style={{ background: '#F9FAFB', border: '2px solid #E5E7EB' }}>
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={data.coupon.logo} 
                alt={data.coupon.courseName} 
                className="w-12 h-12 object-contain"
              />
              <div className="flex-1">
                <div className="font-bold" style={{ color: '#1A1A1A' }}>
                  {data.coupon.courseName}
                </div>
                <div className="text-sm" style={{ color: '#666' }}>
                  {data.coupon.type}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span style={{ color: '#666' }}>Redemption ID</span>
                <span className="font-mono font-bold" style={{ color: '#004D00' }}>{data.redemptionId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: '#666' }}>Redeemed</span>
                <span className="font-medium" style={{ color: '#1A1A1A' }}>
                  {new Date(data.redemptionTime).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-6 p-4 rounded-2xl text-center"
            style={{ background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)' }}
          >
            <div className="text-xs font-medium mb-2" style={{ color: '#991B1B' }}>
              ⏱️ Valid for Today Only - Expires in
            </div>
            <div className="font-mono font-bold text-3xl" style={{ color: '#DC2626' }}>
              {timeLeft}
            </div>
          </div>

          {/* Note */}
          <div className="mb-6 p-4 rounded-xl" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <p className="text-xs" style={{ color: '#92400E' }}>
              <strong>Note:</strong> Show this redemption ID to the staff at the golf course. You can view this in your Active Purchases.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <motion.button
              onClick={onViewPurchases}
              className="w-full py-4 rounded-xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)' }}
              whileTap={{ scale: 0.98 }}
            >
              View Active Purchases
            </motion.button>
            <motion.button
              onClick={onClose}
              className="w-full py-4 rounded-xl font-semibold"
              style={{ background: '#F3F4F6', color: '#374151' }}
              whileTap={{ scale: 0.98 }}
            >
              Continue Browsing
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}