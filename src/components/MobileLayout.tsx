import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Ticket, Trophy, ShoppingBag, MapPin } from 'lucide-react';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/courses', label: 'Course', icon: MapPin },
    { path: '/coupons', label: 'Coupons', icon: Ticket },
    { path: '/home', label: 'Home', icon: Home, isCenter: true },
    { path: '/tournaments', label: 'Tournament', icon: Trophy },
    { path: '/purchases', label: 'Purchases', icon: ShoppingBag }
  ];

  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  // Hide bottom nav on detail pages and profile
  const hideBottomNav = location.pathname.includes('/coupon/') || 
                        location.pathname.includes('/tournament/') ||
                        location.pathname.includes('/profile') ||
                        location.pathname.includes('/history');

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${!hideBottomNav ? 'pb-20' : ''}`}>
        {children}
      </div>

      {/* Bottom Navigation */}
      {!hideBottomNav && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 max-w-md mx-auto z-50"
          style={{
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="relative flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              
              if (item.isCenter) {
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 -top-8"
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl mb-1"
                      style={{
                        background: 'linear-gradient(135deg, #004D00 0%, #0A810A 100%)'
                      }}
                      animate={active ? {
                        boxShadow: [
                          '0 8px 24px rgba(10, 129, 10, 0.3)',
                          '0 8px 32px rgba(10, 129, 10, 0.4)',
                          '0 8px 24px rgba(10, 129, 10, 0.3)'
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <span className="text-xs font-bold" style={{ color: '#0A810A' }}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              }

              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center justify-center flex-1 py-2"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div 
                    animate={active ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon 
                      className="w-6 h-6 mb-1" 
                      style={{ color: active ? '#0A810A' : '#9CA3AF' }}
                      strokeWidth={active ? 2.5 : 2}
                    />
                  </motion.div>
                  <span
                    className="text-xs"
                    style={{
                      color: active ? '#0A810A' : '#9CA3AF',
                      fontWeight: active ? 700 : 500
                    }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
