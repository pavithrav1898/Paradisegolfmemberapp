import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from './components/MobileLayout';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import CouponsPage from './components/CouponsPage';
import CouponDetails from './components/CouponDetails';
import TournamentsPage from './components/TournamentsPage';
import TournamentDetails from './components/TournamentDetails';
import PurchasesPage from './components/PurchasesPage';
import HistoryPage from './components/HistoryPage';
import ProfilePage from './components/ProfilePage';
import { LocationProvider } from './components/LocationContext';
import { RedemptionProvider } from './components/RedemptionContext';

export default function App() {
  return (
    <Router>
      <LocationProvider>
        <RedemptionProvider>
          <MobileLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/coupons" element={<CouponsPage />} />
              <Route path="/coupon/:id" element={<CouponDetails />} />
              <Route path="/tournaments" element={<TournamentsPage />} />
              <Route path="/tournament/:id" element={<TournamentDetails />} />
              <Route path="/purchases" element={<PurchasesPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </MobileLayout>
        </RedemptionProvider>
      </LocationProvider>
    </Router>
  );
}