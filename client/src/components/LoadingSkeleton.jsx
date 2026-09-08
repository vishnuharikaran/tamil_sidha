import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6 font-serif">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-forest-700 text-amber-200 animate-bounce flex items-center justify-center text-3xl mx-auto border-2 border-saffron-600">
          🌿
        </div>
        <h2 className="text-xl font-bold font-tamil text-forest-900">Tamil Siddha Clinic</h2>
        <div className="w-3/4 h-3 bg-cream-200 rounded-full mx-auto animate-pulse"></div>
        <div className="w-1/2 h-3 bg-cream-200 rounded-full mx-auto animate-pulse"></div>
        <span className="text-xs font-sans text-slate-500 block pt-2">Loading content...</span>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
