import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 animate-pulse">
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 3 }) => (
  <div className="space-y-3 animate-pulse">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
    ))}
  </div>
);

export const SkeletonText = ({ lines = 1 }) => (
  <div className="space-y-2 animate-pulse">
    {[...Array(lines)].map((_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded-lg w-full"></div>
    ))}
  </div>
);

const Skeleton = { SkeletonCard, SkeletonTable, SkeletonText };

export default Skeleton;
