
import React, { useEffect } from 'react';
import type { BlogPost } from '../types';

interface BlogJsonLdProps {
  post: BlogPost;
}

export const BlogJsonLd: React.FC<BlogJsonLdProps> = ({ post }) => {
  useEffect(() => {
    const scriptId = 'blog-post-jsonld';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "image": post.image,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "BedBug Tracker",
        "logo": {
          "@type": "ImageObject",
          "url": "https://example.com/logo.png" // Placeholder URL
        }
      },
      "datePublished": post.date,
      "dateModified": post.date,
      "description": post.excerpt,
      "articleBody": post.content
    };
    
    script.textContent = JSON.stringify(structuredData);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [post]);

  return null;
};
