import React from 'react';

const Card = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-soft hover:shadow-premium transition-shadow duration-300 overflow-hidden border border-gray-100 ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
