import React from 'react';
import { X } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

const Modal = ({ id, title, children, size = 'md' }) => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen(id)) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => closeModal(id)}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-2xl shadow-xl ${sizeClasses[size]} w-full mx-4 animate-fade-in`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={() => closeModal(id)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
