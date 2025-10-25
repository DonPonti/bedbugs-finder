
import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { GITHUB_REPO_URL } from '../constants';

export const AboutPage: React.FC = () => {
  return (
    <>
      <Seo 
        title="About Us"
        description="Learn about BedBug Tracker, our mission to promote travel safety through community-sourced data, and how you can contribute."
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">About BedBug Tracker</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p>
              BedBug Tracker is a public, open-source project designed to help travelers make informed decisions about where they stay. Our mission is to provide a transparent, community-driven database of hotels and any pest-related issues reported by fellow travelers.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>
            <p>
              This website is a static site, meaning it has no backend server or database in the traditional sense. All the data you see is stored in a single JSON file hosted on GitHub. This has several advantages:
            </p>
            <ul>
              <li><strong>Transparency:</strong> Anyone can view the data file and the history of changes.</li>
              <li><strong>Community-Driven:</strong> The entire directory is maintained by community contributions. If you have a report to add or an update to make, you can directly contribute.</li>
              <li><strong>Speed:</strong> Without a database to query, the site is incredibly fast and reliable.</li>
            </ul>
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Philosophy</h2>
            <p>
              We believe in the power of shared information. A single bad experience at a hotel due to pests can ruin a vacation or business trip. By creating a central place for these reports, we hope to empower travelers and encourage hotels to maintain the highest standards of cleanliness.
            </p>
            <p>
              This project is and will always be free to use. It's built by travelers, for travelers.
            </p>
            <div className="mt-10 text-center">
              <Link
                to="/report"
                className="inline-block bg-emerald-600 text-white font-bold py-3 px-6 rounded-md hover:bg-emerald-700 transition-colors duration-200"
              >
                Learn How to Contribute
              </Link>
               <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 inline-block bg-slate-600 text-white font-bold py-3 px-6 rounded-md hover:bg-slate-700 transition-colors duration-200"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
