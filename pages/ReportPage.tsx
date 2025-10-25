
import React from 'react';
import { Seo } from '../components/Seo';
import { GITHUB_DATA_FILE_URL } from '../constants';

export const ReportPage: React.FC = () => {
  return (
    <>
      <Seo 
        title="Report a Hotel"
        description="Contribute to our database by reporting a hotel. Follow our simple guide to edit our data file on GitHub."
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">How to Report a Hotel</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p>
              Thank you for helping keep our travel community safe! Since our platform is fully transparent and community-driven, contributions are made directly through GitHub. You don't need to be a programmer to do it! Just follow these steps.
            </p>
            <ol>
              <li>
                <strong>Go to the Data File:</strong> Click the button below to go directly to our `hotels.json` data file on GitHub. You'll need a free GitHub account to make edits.
              </li>
              <li>
                <strong>Edit the File:</strong> In the top-right corner of the file view, click the pencil icon (✎) to start editing.
              </li>
              <li>
                <strong>Add or Update a Hotel:</strong>
                <ul>
                  <li><strong>To add a new hotel:</strong> Copy an existing hotel object (from `{` to `}`), paste it at the end of the list (make sure to add a comma after the previous object), and update the details with your information.</li>
                  <li><strong>To update an existing hotel:</strong> Find the hotel in the list and modify its `status`, `lastUpdated`, or add a new entry to its `reports` array.</li>
                </ul>
              </li>
              <li>
                <strong>Propose Changes:</strong> Once you're done, scroll to the bottom of the page. Write a brief description of your change (e.g., "Added pest report for Sunrise Inn") and click the "Propose changes" button.
              </li>
              <li>
                <strong>Submit:</strong> This will create a "pull request". A project maintainer will review your contribution and, if it looks good, merge it into the main data. Your update will appear on the site shortly after!
              </li>
            </ol>
             <div className="mt-10 text-center">
              <a
                href={GITHUB_DATA_FILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-emerald-600 text-white font-bold py-3 px-6 rounded-md hover:bg-emerald-700 transition-colors duration-200"
              >
                Edit hotels.json on GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
