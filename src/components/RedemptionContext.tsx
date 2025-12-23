import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RedeemedCoupon {
  id: string;
  redemptionId: string;
  redemptionTime: number;
  expiryTime: number;
}

interface TournamentPurchase {
  id: string;
  tournamentName: string;
  courseName: string;
  date: string;
  participants: number;
  amount: number;
  purchaseDate: string;
}

interface RedemptionContextType {
  redeemedCoupons: RedeemedCoupon[];
  redeemCoupon: (couponId: string) => string;
  isRedeemed: (couponId: string) => boolean;
  getRedemption: (couponId: string) => RedeemedCoupon | undefined;
  tournamentPurchases: TournamentPurchase[];
  addTournamentPurchase: (purchase: Omit<TournamentPurchase, 'id' | 'purchaseDate'>) => void;
}

const RedemptionContext = createContext<RedemptionContextType | undefined>(undefined);

export function RedemptionProvider({ children }: { children: ReactNode }) {
  const [redeemedCoupons, setRedeemedCoupons] = useState<RedeemedCoupon[]>([]);
  const [tournamentPurchases, setTournamentPurchases] = useState<TournamentPurchase[]>([]);

  const redeemCoupon = (couponId: string): string => {
    const redemptionId = `RDM${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const redemptionTime = Date.now();
    const expiryTime = redemptionTime + (24 * 60 * 60 * 1000); // 24 hours

    setRedeemedCoupons(prev => [...prev, {
      id: couponId,
      redemptionId,
      redemptionTime,
      expiryTime
    }]);

    return redemptionId;
  };

  const isRedeemed = (couponId: string): boolean => {
    const redemption = redeemedCoupons.find(r => r.id === couponId);
    if (!redemption) return false;
    // Check if not expired
    return Date.now() < redemption.expiryTime;
  };

  const getRedemption = (couponId: string): RedeemedCoupon | undefined => {
    return redeemedCoupons.find(r => r.id === couponId && Date.now() < r.expiryTime);
  };

  const addTournamentPurchase = (purchase: Omit<TournamentPurchase, 'id' | 'purchaseDate'>) => {
    const newPurchase: TournamentPurchase = {
      ...purchase,
      id: `TRN${Date.now()}`,
      purchaseDate: new Date().toISOString()
    };
    setTournamentPurchases(prev => [newPurchase, ...prev]);
  };

  return (
    <RedemptionContext.Provider value={{
      redeemedCoupons,
      redeemCoupon,
      isRedeemed,
      getRedemption,
      tournamentPurchases,
      addTournamentPurchase
    }}>
      {children}
    </RedemptionContext.Provider>
  );
}

export function useRedemption() {
  const context = useContext(RedemptionContext);
  if (context === undefined) {
    throw new Error('useRedemption must be used within a RedemptionProvider');
  }
  return context;
}
