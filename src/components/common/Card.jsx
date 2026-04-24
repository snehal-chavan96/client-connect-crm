import React from 'react';

const Card = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-none hover:shadow-card-hover dark:hover:shadow-glow transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 ${className}`}>
      {(title || action) && (
        <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-gray-50/50 to-white dark:from-gray-800 dark:to-gray-800/80">
          {title && <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{title}</h3>}
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
