import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = Inbox, 
  title = "No data found",
  description = "There's nothing to display here",
  action = null 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 max-w-xs text-center">
        {description}
      </p>
      {action && action}
    </div>
  );
};

export default EmptyState;
