import React, { useEffect } from 'react';
import type { Hotel } from '../types';

interface JsonLdProps {
  hotel: Hotel;
}

export const JsonLd: React.FC<JsonLdProps> = ({ hotel }) => {
  useEffect(() => {
    const scriptId = 'hotel-jsonld';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      // FIX: Use `setAttribute` to avoid a TypeScript error. The `script` variable is
      // typed as `HTMLElement`, which doesn't have a `type` property, unlike
      // `HTMLScriptElement`. `setAttribute` is a valid method on all HTMLElements.
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": hotel.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": hotel.city,
      },
      "image": hotel.image,
      "description": `Check the latest community-sourced pest reports for ${hotel.name} in ${hotel.city}. Current status: ${hotel.status}.`,
      ...(hotel.reports.length > 0 && {
        "review": hotel.reports.map(report => ({
          "@type": "Review",
          "reviewBody": `Pest report: ${report.type}. Notes: ${report.notes}`,
          "datePublished": report.date,
          "author": {
            "@type": "Person",
            "name": "Community Contributor"
          }
        }))
      })
    };
    
    script.textContent = JSON.stringify(structuredData);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [hotel]);

  return null;
};
