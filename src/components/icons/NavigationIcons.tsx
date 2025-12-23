import React from 'react';

export const HomeGolfIcon = ({ className, color }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill={color || 'currentColor'} />
    <path d="M12 12 L12 22" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 22 L15 22" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="8" r="1" fill="white" opacity="0.3"/>
    <circle cx="13.5" cy="7" r="0.5" fill="white" opacity="0.5"/>
    <circle cx="10.5" cy="8.5" r="0.5" fill="white" opacity="0.5"/>
  </svg>
);

export const CourseFlagIcon = ({ className, color }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 22V4M5 4C7 4 9 6 12 6C15 6 17 4 19 4V14C17 14 15 16 12 16C9 16 7 14 5 14V4Z" 
          stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const CouponTicketIcon = ({ className, color }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V9C19.8954 9 19 9.89543 19 11C19 12.1046 19.8954 13 21 13V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V13C4.10457 13 5 12.1046 5 11C5 9.89543 4.10457 9 3 9Z" 
          fill={color || 'currentColor'}/>
    <path d="M9 9L9 11M9 13L9 15M15 9L15 11M15 13L15 15" 
          stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const TournamentFlagIcon = ({ className, color }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 21V4" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 4L14 8L4 12V4Z" fill={color || 'currentColor'}/>
    <circle cx="16" cy="18" r="2" fill={color || 'currentColor'}/>
  </svg>
);

export const PurchasesBagIcon = ({ className, color }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6H18L20 20H4L6 6Z" fill={color || 'currentColor'}/>
    <path d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6" 
          stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

export const HistoryClockIcon = ({ className, color }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
          stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 6V12L16 14" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 3L6 6" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);