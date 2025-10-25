
import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { TagIcon } from './icons';

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-emerald-700 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-800">
            <TagIcon className="w-4 h-4 mr-2" />
            {post.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{post.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
          By {post.author} on {post.date}
        </p>
        <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">{post.excerpt}</p>
        <div className="mt-auto">
          <Link
            to={`/blog/${post.id}`}
            className="w-full text-center inline-block bg-emerald-600 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
