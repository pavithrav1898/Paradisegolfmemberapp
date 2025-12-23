import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Phone, Globe, Navigation, CheckCircle, X, Star } from 'lucide-react';
import { useRedemption } from './RedemptionContext';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/031ce25280a33be431a1b80f73e3d61c67c1b442.png';
import saddlebrookLogo from 'figma:asset/7890bff248f1200d8ca110200f4f3dd539b573aa.png';
import heritageIslesLogo from 'figma:asset/980e61a3fd38a4788ddb0f09d51481c8cb9f765e.png';
import brooksvilleLogo from 'figma:asset/89a8f9f8747d7d514746043d7b7951b4700ee5b1.png';
import citrusNationalLogo from 'figma:asset/b414c97515652b1781a12302e59e1bcbe8d93091.png';
import hernandoOaksLogo from 'figma:asset/1213a1ad133cd81a63ee257035bfe4754c08079f.png';
import eaglesGolfLogo from 'figma:asset/a87254104b76654c333ac8fe07b9067f57f31804.png';

interface TimeSlot {
  time: string;
  price: string;
}

interface CouponData {
  id: string;
  type: string;
  courseName: string;
  distance: string;
  rateType: string;
  logo: string;
  contact: string;
  website: string;
  validFrom: string;
  validTo: string;
  description: string;
  terms: string[];
  timeSlots: TimeSlot[];
  membershipRequired?: string;
  usageType: string;
}

export default function CouponDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { redeemCoupon, isRedeemed } = useRedemption();
  const [selectedDate, setSelectedDate] = useState('2025-12-17');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRedeemedModal, setShowRedeemedModal] = useState(false);
  const [redemptionId, setRedemptionId] = useState('');

  const couponsData: Record<string, CouponData> = {
    '1': {
      id: '1',
      type: 'Double Eagle',
      courseName: 'Saddlebrook Resort',
      distance: '1.5 Miles',
      rateType: 'Pre-season Card Rates',
      logo: saddlebrookLogo,
      contact: '(352) 555-0100',
      website: 'www.saddlebrook.com',
      validFrom: '11/01/2025',
      validTo: '12/31/2025',
      description: 'Buy one round, get one free at Saddlebrook Resort during pre-season. Enjoy championship-level golf at discounted rates.',
      terms: [
        'Valid Monday through Friday only',
        'Cart rental not included',
        'Cannot be combined with other offers',
        'Subject to tee time availability',
        'Must be redeemed by a Paradise Golf member',
        'Use once only - cannot be reused'
      ],
      timeSlots: [
        { time: '7:00 AM - 11:00 AM', price: '$45' },
        { time: '11:00 AM - 7:00 PM', price: '$55' }
      ],
      usageType: 'Use Once Only'
    },
    '2': {
      id: '2',
      type: 'Member for a Day',
      courseName: 'Heritage Isles Golf & CC',
      distance: '2.1 Miles',
      rateType: 'Member Day Access',
      logo: heritageIslesLogo,
      contact: '(352) 555-0200',
      website: 'www.heritageisles.com',
      validFrom: '01/01/2026',
      validTo: '03/31/2026',
      description: 'Experience a full day as a member at Heritage Isles Golf & Country Club. Includes access to all club facilities.',
      terms: [
        'Valid for one day only',
        'Includes golf cart',
        'Access to practice facilities',
        'Clubhouse dining privileges',
        'Advanced reservation required'
      ],
      timeSlots: [
        { time: '7:00 AM - 11:00 AM', price: '$0' },
        { time: '11:00 AM - 7:00 PM', price: '$0' }
      ],
      usageType: 'Use Once Only'
    },
    '3': {
      id: '3',
      type: 'Discount Card',
      courseName: 'Hernando Oaks Golf Club',
      distance: '0.8 Miles',
      rateType: 'Peak Season Card Rates',
      logo: hernandoOaksLogo,
      contact: '(352) 555-0300',
      website: 'www.hernandooaks.com',
      validFrom: '12/01/2025',
      validTo: '02/28/2026',
      description: 'Unlimited use discount card for the entire peak season. Play as much as you want with consistent discounted rates.',
      terms: [
        'Unlimited use throughout season',
        'Valid 7 days a week',
        'Cart included in price',
        'Transferable to immediate family',
        'Blackout dates may apply during tournaments'
      ],
      timeSlots: [
        { time: '7:00 AM - 11:00 AM', price: '$54' },
        { time: '11:00 AM - 7:00 PM', price: '$64' }
      ],
      usageType: 'Unlimited Use'
    },
    '4': {
      id: '4',
      type: 'Complimentary Round',
      courseName: 'Heritage Isles Golf & CC',
      distance: '2.1 Miles',
      rateType: 'Platinum Member Benefit',
      logo: heritageIslesLogo,
      contact: '(352) 555-0200',
      website: 'www.heritageisles.com',
      validFrom: '11/01/2025',
      validTo: '12/24/2025',
      description: 'Complimentary round for Platinum members at Heritage Isles Golf & Country Club. Select your preferred time slot below.',
      terms: [
        'Valid for Platinum members only',
        'Time slot selection required',
        'Must select date and time before redemption',
        'Subject to course availability',
        'Cart included'
      ],
      timeSlots: [
        { time: '7:00 AM - 11:00 AM', price: '$0' },
        { time: '11:00 AM - 7:00 PM', price: '$0' }
      ],
      membershipRequired: 'Platinum',
      usageType: 'Use Once Only'
    },
    '5': {
      id: '5',
      type: 'Member Card',
      courseName: 'Brooksville Country Club',
      distance: '3.2 Miles',
      rateType: 'Season Membership',
      logo: brooksvilleLogo,
      contact: '(352) 555-0400',
      website: 'www.brooksvillecc.com',
      validFrom: '11/01/2025',
      validTo: '04/30/2026',
      description: 'Full season membership card with unlimited access to Brooksville Country Club.',
      terms: [
        'Unlimited rounds',
        'Priority tee time booking',
        'Member rates on cart rental',
        'Access to member events',
        'Transferable within household'
      ],
      timeSlots: [
        { time: 'All Day Access', price: '$1,200' }
      ],
      usageType: 'Unlimited Use'
    },
    '6': {
      id: '6',
      type: 'Tournament',
      courseName: 'Citrus National Golf Club',
      distance: '4.5 Miles',
      rateType: 'Championship Entry',
      logo: citrusNationalLogo,
      contact: '(352) 555-0500',
      website: 'www.citrusnational.com',
      validFrom: '03/01/2026',
      validTo: '03/15/2026',
      description: 'Enter the Spring Championship tournament at Citrus National Golf Club.',
      terms: [
        'Single tournament entry',
        'Includes practice round',
        'Prizes for top finishers',
        'USGA handicap required',
        'Registration closes 48 hours prior'
      ],
      timeSlots: [
        { time: '8:00 AM Shotgun Start', price: '$250' }
      ],
      usageType: 'Use Once Only'
    },
    '7': {
      id: '7',
      type: 'Use Once Only',
      courseName: 'Eagles Golf Club',
      distance: '5.0 Miles',
      rateType: 'Single Round Special',
      logo: eaglesGolfLogo,
      contact: '(352) 555-0600',
      website: 'www.eaglesgolf.com',
      validFrom: '01/15/2026',
      validTo: '02/15/2026',
      description: 'Special one-time use coupon for Eagles Golf Club with discounted rates.',
      terms: [
        'Valid for one round only',
        'Cart included',
        'Cannot be combined with other offers',
        'Subject to availability',
        'Must be used within validity period'
      ],
      timeSlots: [
        { time: '7:00 AM - 11:00 AM', price: '$63' },
        { time: '11:00 AM - 7:00 PM', price: '$73' }
      ],
      usageType: 'Use Once Only'
    }
  };

  const coupon = couponsData[id || '1'] || couponsData['1'];
  const redeemed = isRedeemed(coupon.id);

  const getCouponTypeColor = (type: string) => {
    switch(type) {
      case 'Discount Card':
        return '#F4A000';
      case 'Complimentary Round':
      case 'Member for a Day':
        return '#0A810A';
      default:
        return '#004D00';
    }
  };

  const handleRedeem = () => {
    if (coupon.type === 'Complimentary Round' && selectedTimeSlot === null) {
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmRedeem = () => {
    const redemptionId = redeemCoupon(coupon.id);
    setRedemptionId(redemptionId);
    setShowConfirmModal(false);
    setShowRedeemedModal(true);
  };

  const canRedeem = !redeemed && (coupon.type !== 'Complimentary Round' || selectedTimeSlot !== null);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full"
            style={{ background: 'rgba(0, 77, 0, 0.08)' }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#004D00' }} />
          </button>
          <img src={logoImage} alt="Paradise Golf" className="h-8" />
        </div>
      </div>

      {/* Main Card */}
      <div className="px-4 py-6">
        <div 
          className="bg-white rounded-xl p-4"
          style={{ boxShadow: '0px 2px 10px rgba(0,0,0,0.08)' }}
        >
          {/* Two Column Layout */}
          <div className="flex gap-4 mb-4">
            {/* Left Column - Logo & Actions */}
            <div className="flex flex-col items-center" style={{ width: '40%' }}>
              {/* Course Logo */}
              <div className="mb-3">
                <img 
                  src={coupon.logo} 
                  alt={coupon.courseName} 
                  className="w-18 h-18 object-contain"
                />
              </div>

              {/* Contact Details */}
              <div className="space-y-2 w-full">
                <a 
                  href={`tel:${coupon.contact}`}
                  className="flex items-center gap-2 text-xs"
                  style={{ color: '#0A810A' }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{coupon.contact}</span>
                </a>
                <a 
                  href={`https://${coupon.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs"
                  style={{ color: '#0A810A' }}
                >
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{coupon.website}</span>
                </a>
                <button 
                  className="flex items-center gap-2 text-xs w-full"
                  style={{ color: '#0A810A' }}
                >
                  <Navigation className="w-4 h-4 flex-shrink-0" />
                  <span>Get Direction</span>
                </button>
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="flex-1">
              {/* Course Name */}
              <h1 className="font-semibold mb-1" style={{ fontSize: '18px', color: '#1A1A1A' }}>
                {coupon.courseName}
              </h1>

              {/* Coupon Type */}
              <div className="font-medium mb-1" style={{ fontSize: '13px', color: getCouponTypeColor(coupon.type) }}>
                {coupon.type}
              </div>

              {/* Distance */}
              <div className="mb-2" style={{ fontSize: '12px', color: '#666' }}>
                {coupon.distance}
              </div>

              {/* Rate Type */}
              <div className="font-medium" style={{ fontSize: '13px', color: '#333' }}>
                {coupon.rateType}
              </div>
            </div>
          </div>

          {/* Date Selector for Complimentary Round */}
          {coupon.type === 'Complimentary Round' && (
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block" style={{ color: '#333' }}>
                Select Play Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#0A810A' } as any}
                min={coupon.validFrom.split('/').reverse().join('-')}
                max={coupon.validTo.split('/').reverse().join('-')}
              />
            </div>
          )}

          {/* Date Display */}
          <div className="mb-3">
            <div 
              className="inline-block px-3 py-1.5 rounded-full"
              style={{ background: '#EFEFEF', fontSize: '12px', color: '#333' }}
            >
              {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Dec 17, 2025'}
            </div>
          </div>

          {/* Time Slots */}
          <div className="space-y-2 mb-4">
            {coupon.timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => coupon.type === 'Complimentary Round' && setSelectedTimeSlot(index)}
                className={`w-full flex items-center gap-3 ${
                  coupon.type === 'Complimentary Round' ? 'cursor-pointer' : 'cursor-default'
                } ${
                  selectedTimeSlot === index ? 'bg-green-50' : ''
                }`}
              >
                {/* Green Vertical Bar */}
                <div 
                  className="w-0.5 h-10 rounded-full"
                  style={{ 
                    background: selectedTimeSlot === index ? '#0A810A' : '#0A810A',
                    opacity: selectedTimeSlot === index ? 1 : 0.5
                  }}
                />
                
                {/* Time */}
                <div className="flex-1 text-left" style={{ fontSize: '13px', color: '#333' }}>
                  {slot.time}
                </div>

                {/* Price */}
                <div 
                  className="font-bold"
                  style={{ 
                    fontSize: '15px', 
                    color: slot.price === '$0' ? '#0A810A' : '#1A1A1A' 
                  }}
                >
                  {slot.price}
                </div>
              </button>
            ))}
          </div>

          {/* Valid Dates */}
          <div className="text-xs text-gray-500 mb-3">
            Valid: {coupon.validFrom} - {coupon.validTo}
          </div>

          {/* Usage Type */}
          <div 
            className="text-xs font-medium mb-3 inline-block px-3 py-1 rounded-full"
            style={{ 
              background: '#F0FDF4',
              color: '#0A810A'
            }}
          >
            {coupon.usageType}
          </div>

          {/* Membership Badge */}
          {coupon.membershipRequired && (
            <div 
              className="mb-3 px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-semibold"
              style={{
                background: '#FEF3C7',
                color: '#92400E'
              }}
            >
              <Star className="w-4 h-4 fill-current" />
              {coupon.membershipRequired} Members Only
            </div>
          )}
        </div>

        {/* Description */}
        <div 
          className="bg-white rounded-xl p-4 mt-4"
          style={{ boxShadow: '0px 2px 10px rgba(0,0,0,0.08)' }}
        >
          <h3 className="font-semibold mb-2" style={{ fontSize: '15px', color: '#1A1A1A' }}>
            Description
          </h3>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
            {coupon.description}
          </p>
        </div>

        {/* Terms & Conditions */}
        <div 
          className="bg-white rounded-xl p-4 mt-4"
          style={{ boxShadow: '0px 2px 10px rgba(0,0,0,0.08)' }}
        >
          <h3 className="font-semibold mb-3" style={{ fontSize: '15px', color: '#1A1A1A' }}>
            Terms & Conditions
          </h3>
          <ul className="space-y-2">
            {coupon.terms.map((term, index) => (
              <li key={index} className="flex items-start gap-2" style={{ fontSize: '13px', color: '#666' }}>
                <span style={{ color: '#0A810A' }}>•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom CTA */}
      {!redeemed && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto">
          <button
            onClick={handleRedeem}
            disabled={!canRedeem}
            className="w-full py-3 rounded-lg font-semibold text-white"
            style={{
              background: canRedeem ? '#0A810A' : '#9CA3AF',
              fontSize: '15px',
              opacity: canRedeem ? 1 : 0.5
            }}
          >
            {coupon.type === 'Complimentary Round' ? 'REDEEM COMPLIMENTARY ROUND' : 'REDEEM COUPON'}
          </button>
          {!canRedeem && coupon.type === 'Complimentary Round' && (
            <p className="text-center text-xs text-gray-500 mt-2">
              Please select a time slot to continue
            </p>
          )}
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showConfirmModal && (
          <Modal
            title="Confirm Redemption"
            message={`Are you sure you want to redeem this ${coupon.type.toLowerCase()}?${
              coupon.type === 'Complimentary Round' && selectedTimeSlot !== null 
                ? `\n\nDate: ${new Date(selectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}\nTime: ${coupon.timeSlots[selectedTimeSlot].time}` 
                : ''
            }`}
            onConfirm={confirmRedeem}
            onCancel={() => setShowConfirmModal(false)}
            confirmText="Redeem"
          />
        )}

        {showRedeemedModal && (
          <Modal
            title="Successfully Redeemed!"
            message={`Redemption ID: ${redemptionId}\n\nYou have 4 hours to use this coupon. Show this ID at the course.`}
            onConfirm={() => {
              setShowRedeemedModal(false);
              navigate('/history');
            }}
            confirmText="View History"
            icon={<CheckCircle className="w-16 h-16" style={{ color: '#0A810A' }} />}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({ title, message, onConfirm, onCancel, confirmText, icon }: any) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-sm w-full"
        style={{ boxShadow: '0px 4px 20px rgba(0,0,0,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {icon && (
          <div className="flex justify-center mb-4">
            {icon}
          </div>
        )}
        <h3 className="font-semibold mb-3 text-center" style={{ fontSize: '18px', color: '#1A1A1A' }}>
          {title}
        </h3>
        <p className="text-center mb-6 whitespace-pre-line" style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
          {message}
        </p>
        <div className={`flex gap-3 ${onCancel ? '' : 'flex-col'}`}>
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-lg border-2 font-semibold"
              style={{ borderColor: '#004D00', color: '#004D00', fontSize: '13px' }}
            >
              Cancel
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`${onCancel ? 'flex-1' : 'w-full'} py-3 rounded-lg font-semibold text-white`}
            style={{ background: '#0A810A', fontSize: '13px' }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}