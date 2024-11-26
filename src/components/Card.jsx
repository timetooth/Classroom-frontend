import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
    {children}
  </div>
);

export default Card;