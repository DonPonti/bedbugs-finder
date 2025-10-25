
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { PencilIcon, StarIcon, DollarSignIcon } from '../components/icons';
import { hotels as allHotels } from '../data/hotels';
import type { Hotel } from '../types';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon 
          key={index} 
          className={`w-6 h-6 ${index < Math.round(rating) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
          solid={index < Math.round(rating)}
        />
      ))}
      <span className="ml-2 text-slate-600 dark:text-slate-300 font-semibold">{rating.toFixed(1)}</span>
      <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">/ 5</span>
    </div>
  );
};

export const HotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const initialHotel = useMemo(() => allHotels.find(h => h.id === id), [id]);

  const [hotel, setHotel] = useState<Hotel | undefined>(initialHotel);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    image: '',
    description: '',
    avgRating: 0,
    priceRange: ''
  });

  useEffect(() => {
    if (isEditing && hotel) {
      setFormData({
        name: hotel.name,
        city: hotel.city,
        image: hotel.image,
        description: hotel.description,
        avgRating: hotel.avgRating,
        priceRange: hotel.priceRange,
      });
    }
  }, [isEditing, hotel]);

  useEffect(() => {
    setHotel(allHotels.find(h => h.id === id));
  }, [id]);


  if (!hotel) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Hotel not found</h1>
        <Link to="/" className="text-emerald-600 hover:underline mt-4 inline-block">
          &larr; Back to all hotels
        </Link>
      </div>
    );
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (hotel) {
      setHotel({
        ...hotel,
        name: formData.name,
        city: formData.city,
        image: formData.image,
        description: formData.description,
        avgRating: Number(formData.avgRating),
        priceRange: formData.priceRange,
      });
      setIsEditing(false);
      alert("Hotel details updated locally.\n\nPlease note: This change is not saved permanently. To contribute, please follow the guide on the 'Report a Hotel' page.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const isClean = hotel.status === 'Clean';
  const statusColor = isClean ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';
  const statusBgColor = isClean ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-red-100 dark:bg-red-900';
  
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm";

  return (
    <>
      <Seo 
        title={hotel.name}
        description={`Pest report details for ${hotel.name}, ${hotel.city}. Current status: ${hotel.status}.`}
      />
      <JsonLd hotel={hotel} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-64 w-full object-cover md:w-80" src={hotel.image} alt={hotel.name} />
            </div>
            <div className="p-8 flex-grow">
              {isEditing ? (
                 <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Hotel Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className={inputStyles}/>
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                        <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} className={inputStyles}/>
                    </div>
                     <div>
                        <label htmlFor="avgRating" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Average Rating (0-5)</label>
                        <input type="number" name="avgRating" id="avgRating" value={formData.avgRating} onChange={handleInputChange} className={inputStyles} step="0.1" min="0" max="5"/>
                    </div>
                     <div>
                        <label htmlFor="priceRange" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Price Range (e.g., $, $$, $$$)</label>
                        <input type="text" name="priceRange" id="priceRange" value={formData.priceRange} onChange={handleInputChange} className={inputStyles}/>
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                        <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} className={inputStyles + " min-h-[100px]"}/>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Image URL</label>
                        <input type="text" name="image" id="image" value={formData.image} onChange={handleInputChange} className={inputStyles}/>
                    </div>
                    <div className="flex items-center space-x-4 pt-2">
                        <button onClick={handleSave} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                          Save Changes
                        </button>
                        <button onClick={handleCancel} className="inline-flex justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                          Cancel
                        </button>
                    </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="uppercase tracking-wide text-sm text-emerald-500 font-semibold">{hotel.city}</div>
                      <h1 className="block mt-1 text-3xl leading-tight font-extrabold text-black dark:text-white">{hotel.name}</h1>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      aria-label="Edit hotel details"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Last updated: {hotel.lastUpdated}</p>
                  <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${statusColor} ${statusBgColor}`}>
                    {isClean ? '✅' : '⚠️'}
                    <span className="ml-3">{hotel.status}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="p-8 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Highlights</h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0">
                <div className="flex items-center">
                    <StarRating rating={hotel.avgRating} />
                </div>
                <div className="flex items-center">
                    <DollarSignIcon className="w-6 h-6 mr-2 text-emerald-500" />
                    <div>
                      <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">{hotel.priceRange}</span>
                      <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">Price Range</span>
                    </div>
                </div>
            </div>
          </div>

          <div className="p-8 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-4">Description & Details</h2>
            <div className="text-slate-600 dark:text-slate-300 prose dark:prose-invert max-w-none">
              {hotel.description.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </div>

          <div className="p-8 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-4">Pest Report Details</h2>
            {hotel.reports.length > 0 ? (
              <div className="space-y-6">
                {hotel.reports.map((report, index) => (
                  <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-lg font-semibold text-red-700 dark:text-red-400">{report.type}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{report.date}</p>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300"><strong>Notes:</strong> {report.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                <p className="text-slate-600 dark:text-slate-400">No pest issues have been reported for this hotel. All clear!</p>
              </div>
            )}
            <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 italic">
              <p>All reports are submitted by the community and are not independently verified.</p>
              <p>Think this is incorrect? You can help by contributing.</p>
            </div>
          </div>
        </div>
         <div className="text-center mt-8">
          <Link to="/" className="text-emerald-600 hover:underline mt-4 inline-block font-semibold">
            &larr; Back to all hotels
          </Link>
        </div>
      </main>
    </>
  );
};