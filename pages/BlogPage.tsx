import React, { useState, useMemo } from 'react';
import { Seo } from '../components/Seo';
import { BlogPostCard } from '../components/BlogPostCard';
import { TagIcon } from '../components/icons';
import { blogPosts } from '../data/blogPosts';

export const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const posts = useMemo(() => 
    [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  const categories = useMemo(() => {
    const allCategories = posts.map(p => p.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') {
      return posts;
    }
    return posts.filter(p => p.category === activeCategory);
  }, [posts, activeCategory]);
  
  const CategoryButton: React.FC<{ category: string }> = ({ category }) => {
    const isActive = category === activeCategory;
    const baseClasses = "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-emerald-500";
    const activeClasses = "bg-emerald-600 text-white";
    const inactiveClasses = "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600";

    return (
       <button onClick={() => setActiveCategory(category)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
        {category !== 'All' && <TagIcon className="w-4 h-4 mr-2" />}
        {category}
      </button>
    );
  };

  return (
    <>
      <Seo 
        title="Blog" 
        description="Read our latest articles on travel safety, pest prevention tips, and community news." 
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Our Blog
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Insights on travel safety, pest prevention, and community updates.
          </p>
        </div>

        <div className="mb-10 text-center">
            <div className="flex flex-wrap justify-center gap-2">
                {categories.map(cat => <CategoryButton key={cat} category={cat} />)}
            </div>
        </div>
        
        <>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
                <p className="text-slate-500 dark:text-slate-400">No posts found in this category.</p>
            </div>
          )}
        </>
      </main>
    </>
  );
};
