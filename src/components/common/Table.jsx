import React from 'react';

const Table = ({ columns, data, className = '' }) => {
  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
            {columns.map((col, index) => (
              <th 
                key={index}
                className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-50 dark:divide-gray-700">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-primary-50/50 dark:hover:bg-gray-700 transition-colors duration-150">
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex}
                    className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap"
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
