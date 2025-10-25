import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { GithubIcon, MenuIcon, XIcon, BedbugIcon } from './icons';
import { GITHUB_REPO_URL } from '../constants';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { // Cleanup on component unmount
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `py-2 text-sm font-medium transition-colors border-b-2 ${
      isActive
        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
        : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `text-3xl font-bold transition-colors ${
      isActive
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400'
    }`;

  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" onClick={closeMenu} className="flex-shrink-0 flex items-center space-x-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                <BedbugIcon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                <span>BedBug Tracker</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
              <NavLink to="/report" className={navLinkClass}>Report a Hotel</NavLink>
            </div>

            <div className="flex items-center space-x-2">
              <a 
                href={GITHUB_REPO_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors hidden sm:block"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <ThemeToggle />
              <div className="md:hidden">
                <button
                  onClick={openMenu}
                  className="p-2 rounded-md inline-flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                  aria-controls="mobile-menu"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="block h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-white dark:bg-slate-900 transition-opacity duration-300 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          <div className="flex items-center justify-between h-16">
             <Link to="/" onClick={closeMenu} className="flex-shrink-0 flex items-center space-x-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                <BedbugIcon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                <span>BedBug Tracker</span>
              </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-md inline-flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Close main menu</span>
              <XIcon className="block h-6 w-6" />
            </button>
          </div>
          <nav className="flex-grow flex flex-col items-center justify-center space-y-8 -mt-16">
            <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/blog" className={mobileNavLinkClass} onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={closeMenu}>About</NavLink>
            <NavLink to="/report" className={mobileNavLinkClass} onClick={closeMenu}>Report a Hotel</NavLink>
             <a 
              href={GITHUB_REPO_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};
