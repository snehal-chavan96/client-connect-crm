import React from 'react';
import { X } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Drawer = ({ id, title, children, side = 'right' }) => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen(id)) return null;

  const sideClasses = {
    left: 'left-0',
    right: 'right-0',
  };

  const slideClasses = {
    left: 'animate-slide-in-left',
    right: 'animate-slide-in-right',
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => closeModal(id)}
      />

      {/* Drawer */}
      <div className={`absolute inset-y-0 ${sideClasses[side]} w-96 bg-white shadow-xl ${slideClasses[side]} overflow-y-auto`}>
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

export default Drawer;
