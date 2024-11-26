import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
