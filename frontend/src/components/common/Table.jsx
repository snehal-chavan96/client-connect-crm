import React from 'react';
import { Inbox } from 'lucide-react';

const Table = ({ columns, data, className = '' }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-100 shadow-sm ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {columns.map((col, index) => (
              <th 
                key={index}
                className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {!isEmpty ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-primary-50/50 transition-colors duration-150">
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex}
                    className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Inbox className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No data available</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
