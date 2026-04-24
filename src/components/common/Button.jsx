import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-soft dark:shadow-none hover:shadow-md focus:ring-primary-500",
    secondary: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 focus:ring-gray-300 dark:focus:ring-gray-600",
    outline: "border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 bg-transparent focus:ring-primary-500",
    ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 focus:ring-gray-200 dark:focus:ring-gray-700"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const currentVariantStyle = variants[variant] || variants.primary;
  const currentSizeStyle = sizes[props.size || 'md'];

  return (
    <button 
      className={`${baseStyle} ${currentVariantStyle} ${currentSizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
