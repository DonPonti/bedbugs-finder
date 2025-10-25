
import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
}

export const Seo: React.FC<SeoProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | BedBug Tracker 🪳`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }
  }, [title, description]);

  return null;
};
