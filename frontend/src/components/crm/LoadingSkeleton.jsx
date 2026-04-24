import React from 'react';

const LoadingSkeleton = ({ count = 3, height = 80 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`bg-gray-200 dark:bg-gray-700 rounded-lg h-${height}`}></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
