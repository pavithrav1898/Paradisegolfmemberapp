import React, { useState } from 'react';
import { Calendar, CreditCard, Trophy, Clock, MapPin, ChevronDown, X } from 'lucide-react';
import { useRedemption } from './RedemptionContext';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/031ce25280a33be431a1b80f73e3d61c67c1b442.png';
import saddlebrookLogo from 'figma:asset/7890bff248f1200d8ca110200f4f3dd539b573aa.png';
import heritageIslesLogo from 'figma:asset/980e61a3fd38a4788ddb0f09d51481c8cb9f765e.png';
import brooksvilleLogo from 'figma:asset/89a8f9f8747d7d514746043d7b7951b4700ee5b1.png';

export default function HistoryPage() {
  const { redeemedCoupons, tournamentPurchases } = useRedemption();
  const [activeTab, setActiveTab] = useState<'coupons' | 'tournaments'>('coupons');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateRange, setDateRange] = useState<'all' | '7days' | '30days' | '3months'>('all');

  const couponDetails: Record<string, any> = {
    '1': {
      title: 'Pre-season Cool Rates',
      course: 'Desert Eagle Peak Club',
      image: 'https://images.unsplash.com/photo-1605144884374-ecbb643615f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xmJTIwY291cnNlJTIwYWVyaWFsfGVufDF8fHx8MTc2NjA1NjkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '50% OFF'
    }
  };

  const CountdownTimer = ({ expiryTime }: { expiryTime: number }) => {
    const [timeLeft, setTimeLeft] = React.useState(expiryTime - Date.now());

    React.useEffect(() => {
      const timer = setInterval(() => {
        const remaining = expiryTime - Date.now();
        setTimeLeft(remaining);
        if (remaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [expiryTime]);

    if (timeLeft <= 0) {
      return <span className="text-red-600 text-sm">Expired</span>;
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return (
      <div className="flex items-center gap-1 text-red-600 text-sm">
        <Clock className="w-4 h-4" />
        <span>{hours}h {minutes}m left</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <img src={logoImage} alt="Paradise Golf" className="h-8" />
            <h1 className="text-xl font-bold" style={{ color: '#004D00' }}>
              History
            </h1>
            <div className="w-8" />
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <motion.button
              onClick={() => setActiveTab('coupons')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'coupons'
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600'
              }`}
              style={activeTab === 'coupons' ? { 
                background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)' 
              } : {}}
              whileTap={{ scale: 0.98 }}
            >
              Coupons
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('tournaments')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'tournaments'
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600'
              }`}
              style={activeTab === 'tournaments' ? { 
                background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)' 
              } : {}}
              whileTap={{ scale: 0.98 }}
            >
              Tournaments
            </motion.button>
          </div>

          {/* Date Filter */}
          <div className="relative mt-4">
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="flex items-center gap-1 text-sm text-gray-500"
            >
              <Calendar className="w-4 h-4" />
              <span>Filter by Date</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showDateFilter && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 bg-white shadow-md rounded-md z-50"
                >
                  <div className="p-2">
                    <button
                      onClick={() => setDateRange('all')}
                      className={`block w-full text-left px-2 py-1 text-sm ${
                        dateRange === 'all' ? 'text-emerald-600' : 'text-gray-500'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setDateRange('7days')}
                      className={`block w-full text-left px-2 py-1 text-sm ${
                        dateRange === '7days' ? 'text-emerald-600' : 'text-gray-500'
                      }`}
                    >
                      Last 7 Days
                    </button>
                    <button
                      onClick={() => setDateRange('30days')}
                      className={`block w-full text-left px-2 py-1 text-sm ${
                        dateRange === '30days' ? 'text-emerald-600' : 'text-gray-500'
                      }`}
                    >
                      Last 30 Days
                    </button>
                    <button
                      onClick={() => setDateRange('3months')}
                      className={`block w-full text-left px-2 py-1 text-sm ${
                        dateRange === '3months' ? 'text-emerald-600' : 'text-gray-500'
                      }`}
                    >
                      Last 3 Months
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {activeTab === 'coupons' && (
          <div>
            {redeemedCoupons.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🎫</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#004D00' }}>
                  No Redeemed Coupons
                </h3>
                <p className="text-gray-600">
                  Your redeemed coupons will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {redeemedCoupons.map((redemption, index) => {
                  const coupon = couponDetails[redemption.id];
                  if (!coupon) return null;

                  return (
                    <motion.div
                      key={redemption.redemptionId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-md"
                    >
                      <div className="relative h-32">
                        <img 
                          src={coupon.image} 
                          alt={coupon.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white mb-1">{coupon.title}</h3>
                          <p className="text-white/80 text-sm">{coupon.course}</p>
                        </div>
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs">
                          {coupon.discount}
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">Redemption ID</span>
                          <span className="text-slate-900 text-sm">{redemption.redemptionId}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">Redeemed</span>
                          <span className="text-slate-900 text-sm">
                            {new Date(redemption.redemptionTime).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-gray-600 text-sm">Status</span>
                          <CountdownTimer expiryTime={redemption.expiryTime} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div>
            {tournamentPurchases.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#004D00' }}>
                  No Tournament Registrations
                </h3>
                <p className="text-gray-600">
                  Your tournament registrations will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {tournamentPurchases.map((purchase, index) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-4 shadow-md"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-6 h-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-slate-900 mb-1">{purchase.tournamentName}</h3>
                        <p className="text-gray-600 text-sm">{purchase.courseName}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-600 text-2xl mb-0.5">${purchase.amount}</div>
                        <div className="text-gray-500 text-xs">Total</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Tournament Date</div>
                        <div className="text-slate-900 text-sm flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {purchase.date}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Participants</div>
                        <div className="text-slate-900 text-sm">
                          {purchase.participants} {purchase.participants === 1 ? 'Player' : 'Players'}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Registered On</div>
                        <div className="text-slate-900 text-sm">
                          {new Date(purchase.purchaseDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Confirmation</div>
                        <div className="text-slate-900 text-sm">{purchase.id}</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2 text-xs text-emerald-600">
                        <CreditCard className="w-4 h-4" />
                        <span>Paid via Shopify</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}