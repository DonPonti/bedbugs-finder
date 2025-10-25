
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 mt-auto">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} BedBug Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
