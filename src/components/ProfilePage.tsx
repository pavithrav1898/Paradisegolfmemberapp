import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Mail, Phone, Calendar, CreditCard, Award, ChevronRight, LogOut, Settings, Bell, HelpCircle } from 'lucide-react';
import { useLocation } from './LocationContext';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/031ce25280a33be431a1b80f73e3d61c67c1b442.png';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { location } = useLocation();

  const userData = {
    name: 'Parveen Rai',
    email: 'parveen.rai@example.com',
    phone: '+1 (555) 123-4567',
    memberId: 'GOLFER-300166',
    membershipType: 'PLATINUM',
    memberSince: '2020',
    validUntil: 'Apr 30, 2026'
  };

  const menuItems = [
    {
      icon: CreditCard,
      label: 'Payment Methods',
      description: 'Manage your cards',
      action: () => {}
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage preferences',
      action: () => {}
    },
    {
      icon: MapPin,
      label: 'Location',
      description: location,
      action: () => {}
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'App preferences',
      action: () => {}
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get assistance',
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 pt-4 pb-24">
        <div className="px-4 py-4">
          <img src={logoImage} alt="Paradise Golf" className="h-8 brightness-0 invert" />
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          {/* Avatar & Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-slate-900 text-2xl mb-1">{userData.name}</h2>
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs">
                  {userData.membershipType}
                </div>
                <span className="text-gray-500 text-sm">Member since {userData.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span className="text-sm">{userData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <span className="text-sm">{userData.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Award className="w-5 h-5" />
              <span className="text-sm">ID: {userData.memberId}</span>
            </div>
          </div>

          {/* Membership Info */}
          <div className="pt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-500 text-xs mb-1">Member Since</div>
              <div className="text-slate-900">{userData.memberSince}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs mb-1">Valid Until</div>
              <div className="text-slate-900">{userData.validUntil}</div>
            </div>
          </div>

          {/* Upgrade Button */}
          <button
            onClick={() => {}}
            className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-emerald-800 transition"
          >
            <Award className="w-5 h-5" />
            Upgrade Membership
          </button>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={item.action}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm active:scale-98 transition-transform"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-slate-900 mb-0.5">{item.label}</div>
                  <div className="text-gray-500 text-sm">{item.description}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </motion.button>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {}}
          className="w-full bg-red-50 text-red-600 rounded-2xl p-4 flex items-center justify-center gap-2 mb-6 hover:bg-red-100 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>

        {/* Version */}
        <div className="text-center text-gray-400 text-sm pb-4">
          Paradise Golf App v1.0.0
        </div>
      </div>
    </div>
  );
}
