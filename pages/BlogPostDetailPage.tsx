
import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { BlogJsonLd } from '../components/BlogJsonLd';
import { TagIcon } from '../components/icons';
import type { BlogPost } from '../types';

export const BlogPostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No post ID provided.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const manifestResponse = await fetch('/data/blogs-manifest.json');
        if (!manifestResponse.ok) throw new Error('Could not load blog manifest.');
        const manifestData = await manifestResponse.json();
        const postMeta = manifestData.find((p: BlogPost) => p.id === id);

        if (!postMeta) {
          throw new Error('Post not found.');
        }

        const contentResponse = await fetch(`/data/blogs/${id}.md`);
        if (!contentResponse.ok) throw new Error('Could not load post content.');
        const markdownText = await contentResponse.text();

        const contentParts = markdownText.split('---');
        const content = contentParts.length > 2 ? contentParts.slice(2).join('---').trim() : '';

        setPost({ ...postMeta, content });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20"><p>Loading post...</p></div>;
  }

  if (error || !post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600">{error || 'Post not found.'}</h1>
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
                {(post.content || '').split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
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
