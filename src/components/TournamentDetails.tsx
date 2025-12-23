import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, Trophy, DollarSign, CheckCircle, X, AlertCircle } from 'lucide-react';
import { useRedemption } from './RedemptionContext';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/031ce25280a33be431a1b80f73e3d61c67c1b442.png';

interface Participant {
  name: string;
  email: string;
  phone: string;
  handicap: string;
}

export default function TournamentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addTournamentPurchase } = useRedemption();
  const [numParticipants, setNumParticipants] = useState(1);
  const [participants, setParticipants] = useState<Participant[]>([
    { name: '', email: '', phone: '', handicap: '' }
  ]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock tournament data
  const tournament = {
    id: id || '1',
    name: 'Paradise Spring Championship',
    course: 'Paradise Valley Golf Club',
    location: 'Scottsdale, AZ',
    date: 'March 15, 2026',
    time: '8:00 AM',
    image: 'https://images.unsplash.com/photo-1523982765444-622af25647b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xmJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NjYwNTc5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    entryFee: 250,
    spotsLeft: 12,
    format: '18 Holes - Stroke Play',
    prizes: ['1st Place: $5,000', '2nd Place: $2,500', '3rd Place: $1,000'],
    description: 'Join us for the annual Paradise Spring Championship, featuring 18 holes of championship golf at Paradise Valley Golf Club. This tournament is open to all skill levels and includes lunch and awards ceremony.',
    includes: [
      '18 holes of golf',
      'Cart rental',
      'Lunch and refreshments',
      'Tournament swag bag',
      'Awards ceremony',
      'Professional scoring'
    ]
  };

  const handleNumParticipantsChange = (num: number) => {
    setNumParticipants(num);
    const newParticipants = Array(num).fill(null).map((_, i) => 
      participants[i] || { name: '', email: '', phone: '', handicap: '' }
    );
    setParticipants(newParticipants);
  };

  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setParticipants(newParticipants);
  };

  const isFormValid = () => {
    return participants.every(p => p.name && p.email && p.phone);
  };

  const handleProceedToPayment = () => {
    if (isFormValid()) {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate Shopify payment process
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1; // 10% chance of failure for demo
      
      if (shouldFail) {
        setIsProcessing(false);
        setShowPaymentModal(false);
        setShowErrorModal(true);
      } else {
        // Add to tournament purchases
        addTournamentPurchase({
          tournamentName: tournament.name,
          courseName: tournament.course,
          date: tournament.date,
          participants: numParticipants,
          amount: tournament.entryFee * numParticipants
        });
        
        setIsProcessing(false);
        setShowPaymentModal(false);
        setShowSuccessModal(true);
      }
    }, 2000);
  };

  const totalAmount = tournament.entryFee * numParticipants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-slate-900 hover:text-emerald-600"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Image */}
        <div className="relative h-96 rounded-3xl overflow-hidden mb-6">
          <img src={tournament.image} alt={tournament.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span className="text-amber-400">Championship Tournament</span>
            </div>
            <h1 className="text-4xl mb-2">{tournament.name}</h1>
            <div className="text-xl">{tournament.course}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Date</span>
            </div>
            <div className="text-slate-900 text-sm">{tournament.date}</div>
            <div className="text-gray-500 text-sm">{tournament.time}</div>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Location</span>
            </div>
            <div className="text-slate-900 text-sm">{tournament.location}</div>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Users className="w-5 h-5" />
              <span className="text-sm">Spots Left</span>
            </div>
            <div className="text-emerald-600 text-xl">{tournament.spotsLeft}</div>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm">Entry Fee</span>
            </div>
            <div className="text-slate-900 text-xl">${tournament.entryFee}</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-slate-900 text-xl mb-3">About Tournament</h2>
          <p className="text-gray-600 mb-4">{tournament.description}</p>
          <div className="bg-emerald-50 p-4 rounded-xl">
            <div className="text-emerald-700 mb-1">Format</div>
            <div className="text-slate-900">{tournament.format}</div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-slate-900 text-xl mb-4">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {tournament.includes.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prizes */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 mb-6">
          <h2 className="text-slate-900 text-xl mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-600" />
            Prize Pool
          </h2>
          <div className="space-y-2">
            {tournament.prizes.map((prize, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-900">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-amber-500 text-white' :
                  index === 1 ? 'bg-gray-300 text-slate-900' :
                  'bg-orange-400 text-white'
                }`}>
                  {index + 1}
                </div>
                <span>{prize}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-slate-900 text-xl mb-4">Tournament Registration</h2>
          
          {/* Number of Participants */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Number of Participants</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumParticipantsChange(num)}
                  className={`flex-1 py-3 rounded-xl transition ${
                    numParticipants === num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-slate-900 hover:bg-gray-200'
                  }`}
                >
                  {num} {num === 1 ? 'Player' : 'Players'}
                </button>
              ))}
            </div>
          </div>

          {/* Participant Details */}
          <div className="space-y-6">
            {participants.map((participant, index) => (
              <div key={index} className="border-t pt-6 first:border-t-0 first:pt-0">
                <h3 className="text-slate-900 mb-4">Participant {index + 1}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      value={participant.email}
                      onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={participant.phone}
                      onChange={(e) => handleParticipantChange(index, 'phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">Handicap (Optional)</label>
                    <input
                      type="text"
                      value={participant.handicap}
                      onChange={(e) => handleParticipantChange(index, 'handicap', e.target.value)}
                      placeholder="15.2"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Payment */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Entry Fee (per player)</span>
            <span className="text-slate-900">${tournament.entryFee}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Number of Players</span>
            <span className="text-slate-900">×{numParticipants}</span>
          </div>
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-900 text-xl">Total Amount</span>
              <span className="text-emerald-600 text-3xl">${totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleProceedToPayment}
          disabled={!isFormValid()}
          className={`w-full py-4 rounded-xl transition ${
            isFormValid()
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Proceed to Payment
        </button>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !isProcessing && setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h2 className="text-slate-900 text-2xl mb-4">Payment Details</h2>
              <div className="bg-emerald-50 p-4 rounded-xl mb-6">
                <div className="text-gray-600 text-sm mb-1">Total Amount</div>
                <div className="text-emerald-600 text-3xl">${totalAmount}</div>
              </div>
              
              {/* Mock Shopify Payment Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-600 text-sm mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Complete Payment'}
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isProcessing}
                  className="w-full bg-gray-100 text-slate-900 py-3 rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secured by Shopify Payments
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-slate-900 text-2xl mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                  You have successfully registered for {tournament.name}
                </p>
                <div className="bg-emerald-50 p-4 rounded-xl mb-6 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Tournament</span>
                    <span className="text-slate-900 text-sm">{tournament.name}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Date</span>
                    <span className="text-slate-900 text-sm">{tournament.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Participants</span>
                    <span className="text-slate-900 text-sm">{numParticipants}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  A confirmation email has been sent to all participants
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/history');
                  }}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition"
                >
                  View in History
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-slate-900 text-2xl mb-2">Payment Failed</h2>
                <p className="text-gray-600 mb-6">
                  We're unable to process your payment right now. Please check your card details and try again.
                </p>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="w-full bg-gray-100 text-slate-900 py-3 rounded-xl hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}