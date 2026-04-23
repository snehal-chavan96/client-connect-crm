import React from 'react';

const Button = ({ children, variant = 'primary', className = '', as = 'button', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-soft hover:shadow-md focus:ring-primary-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300",
    outline: "border-2 border-gray-200 hover:border-primary-500 text-gray-700 hover:text-primary-600 bg-transparent focus:ring-primary-500",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const currentVariantStyle = variants[variant] || variants.primary;
  const currentSizeStyle = sizes[props.size || 'md'];

  const Component = as;

  return (
    <Component 
      className={`${baseStyle} ${currentVariantStyle} ${currentSizeStyle} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
