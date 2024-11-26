import React from 'react';

const Header = ({ title, children }) => (
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-bold">{title}</h1>
    {children}
  </div>
);

export default Header;
