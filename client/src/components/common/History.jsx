import React from 'react';

const History = () => {
  return (
    <div className="min-h-screen bg-[var(--section-bg-light)] dark:bg-[var(--section-bg-dark)] 
                    transition-colors duration-300 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] 
                       mb-8 text-center">
          History
        </h1>
        
        {/* Content will be added here later */}
        <div className="bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] 
                      rounded-lg shadow-lg p-6 transition-colors duration-300">
          <p className="text-[var(--text-light)] dark:text-[var(--text-dark)] text-center">
            History page content will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;