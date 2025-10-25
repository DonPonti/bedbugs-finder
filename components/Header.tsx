
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { GithubIcon } from './icons';
import { GITHUB_REPO_URL } from '../constants';

export const Header: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold text-emerald-600 dark:text-emerald-400">
              BedBug Tracker 🪳
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
                <NavLink to="/about" className={navLinkClass}>About</NavLink>
                <NavLink to="/report" className={navLinkClass}>Report a Hotel</NavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a 
              href={GITHUB_REPO_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};
