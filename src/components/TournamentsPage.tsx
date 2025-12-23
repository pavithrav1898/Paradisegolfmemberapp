import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import TournamentCard from './TournamentCard';
import { tournaments } from '../data/tournaments';
import logoImage from 'figma:asset/031ce25280a33be431a1b80f73e3d61c67c1b442.png';

export default function TournamentsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logoImage} alt="Paradise Golf" className="h-8" />
            <h1 className="text-xl font-bold" style={{ color: '#004D00' }}>
              Tournaments
            </h1>
            <div className="w-8" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          {tournaments.map((tournament, index) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              index={index}
              onClick={() => navigate(`/tournament/${tournament.id}`)}
              variant="list"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
