
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { BlogJsonLd } from '../components/BlogJsonLd';
import { TagIcon } from '../components/icons';
import type { BlogPost } from '../types';

const parseMarkdown = (mdContent: string): BlogPost => {
  const frontmatterMatch = mdContent.match(/^---\s*([\s\S]*?)\s*---/);
  if (!frontmatterMatch) {
    throw new Error("Invalid Markdown format: No frontmatter found.");
  }

  const frontmatterText = frontmatterMatch[1];
  const content = mdContent.slice(frontmatterMatch[0].length).trim();

  const metadata: { [key: string]: string } = {};
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      metadata[key.trim()] = value.replace(/^['"]|['"]$/g, '');
    }
  });

  return {
    id: metadata.id,
    title: metadata.title,
    author: metadata.author,
    date: metadata.date,
    category: metadata.category,
    excerpt: metadata.excerpt,
    image: metadata.image,
    content: content,
  };
};

export const BlogPostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Blog post ID is missing.');
      setLoading(false);
      return;
    }

    fetch(`../data/blogs/${id}.md`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Blog post not found.');
        }
        return res.text();
      })
      .then(text => {
        try {
          const fullPost = parseMarkdown(text);
          setPost(fullPost);
        } catch (e) {
          throw new Error('Failed to parse blog post.');
        }
      })
      .catch(err => {
        console.error("Failed to fetch or parse blog post:", err);
        setError(err.message || 'Could not load blog data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
       <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Loading Post...</h1>
      </div>
    )
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
                {post.content?.split('\n\n').map((paragraph, index) => (
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