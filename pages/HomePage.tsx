
import React, { useState, useMemo, useEffect } from 'react';
import { HotelCard } from '../components/HotelCard';
import { Seo } from '../components/Seo';
import type { Hotel } from '../types';

export const HomePage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    fetch('/data/hotels.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data: Hotel[]) => {
        setHotels(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch hotels:", error);
        setLoading(false);
      });
  }, []);

  const filteredHotels = useMemo(() => {
    return hotels
      .filter(hotel => {
        const matchesSearch = 
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = 
          statusFilter === 'all' || hotel.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  }, [hotels, searchTerm, statusFilter]);

  const topCleanHotels = useMemo(() => 
    hotels.filter(h => h.status === 'Clean')
          .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
          .slice(0, 3), [hotels]);

  const recentlyReported = useMemo(() =>
    hotels.filter(h => h.status === 'Pest Reported')
          .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
          .slice(0, 3), [hotels]);

  return (
    <>
      <Seo 
        title="Hotel Directory" 
        description="Search our directory for user-contributed pest reports before you book your next hotel stay." 
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Travel Confidently.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Check our community-sourced directory for pest reports before you book.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-10 sticky top-20 z-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Search by Hotel or City
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., Grand Plaza or New York"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Filter by Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="Clean">✅ Clean</option>
                <option value="Pest Reported">⚠️ Pest Reported</option>
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400">Loading hotels...</p>
          </div>
        ) : (
          <>
            {searchTerm === '' && statusFilter === 'all' && (
              <>
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Top Clean Hotels</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topCleanHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
                  </div>
                </section>
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-400">Recently Reported</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentlyReported.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
                  </div>
                </section>
                <h2 className="text-2xl font-bold mb-6 border-t border-slate-200 dark:border-slate-700 pt-8">All Hotels</h2>
              </>
            )}
            
            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-500 dark:text-slate-400">No hotels found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};
