
import React from 'react';
import { Link } from 'react-router-dom';
import type { Hotel } from '../types';
import { StarIcon } from './icons';

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const isClean = hotel.status === 'Clean';
  const statusColor = isClean ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';
  const statusBgColor = isClean ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-red-100 dark:bg-red-900';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-3">{hotel.city}</p>
        
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <StarIcon 
              key={index} 
              className={`w-4 h-4 ${index < Math.round(hotel.avgRating) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
              solid={index < Math.round(hotel.avgRating)}
            />
          ))}
          <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">({hotel.avgRating})</span>
          <span className="ml-auto text-lg font-bold text-slate-700 dark:text-slate-200">{hotel.priceRange}</span>
        </div>

        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusColor} ${statusBgColor} mb-4 self-start`}>
          {isClean ? '✅' : '⚠️'}
          <span className="ml-2">{hotel.status}</span>
        </div>
        
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Last Updated: {hotel.lastUpdated}</p>
        
        <div className="mt-auto">
          <Link
            to={`/hotel/${hotel.id}`}
            className="w-full text-center inline-block bg-emerald-600 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};