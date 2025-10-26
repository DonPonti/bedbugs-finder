import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { BlogJsonLd } from '../components/BlogJsonLd';
import { TagIcon } from '../components/icons';
import { blogPosts } from '../data/blogPosts';

// Simple markdown renderer to handle bold text and numbered lists
const processInline = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g); // Split by **bold**
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const elements = content.split('\n\n').map((block, blockIndex) => {
    // Check for numbered lists
    if (/^\d+\./.test(block)) {
      const items = block.split('\n').map((item, itemIndex) => {
        const itemContent = item.replace(/^\d+\.\s*/, '');
        const processedItem = processInline(itemContent);
        return <li key={itemIndex}>{processedItem}</li>;
      });
      return <ol key={blockIndex} className="list-decimal list-inside space-y-2 my-4">{items}</ol>;
    }
    
    // Process paragraphs
    const processedBlock = processInline(block);
    return <p key={blockIndex}>{processedBlock}</p>;
  });

  return <>{elements}</>;
};

export const BlogPostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = useMemo(() => blogPosts.find(p => p.id === id), [id]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600">Post not found.</h1>
        <Link to="/blog" className="text-emerald-600 hover:underline mt-4 inline-block">
          &larr; Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo 
        title={post.title}
        description={post.excerpt}
      />
      <BlogJsonLd post={post} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
          <img className="w-full h-64 object-cover" src={post.image} alt={post.title} />
          <div className="p-8">
            <div className="mb-4">
               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-emerald-700 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-800">
                  <TagIcon className="w-4 h-4 mr-2" />
                  {post.category}
                </span>
            </div>
            <h1 className="block text-3xl leading-tight font-extrabold text-black dark:text-white">{post.title}</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              By {post.author} on {post.date}
            </p>
             <div className="mt-6 prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                <MarkdownRenderer content={post.content || ''} />
            </div>
          </div>
        </article>
         <div className="text-center mt-8">
          <Link to="/blog" className="text-emerald-600 hover:underline mt-4 inline-block font-semibold">
            &larr; Back to all posts
          </Link>
        </div>
      </main>
    </>
  );
};
