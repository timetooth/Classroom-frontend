import React from 'react';

const IconInput = ({ type, label, placeholder, icon: Icon, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <div className="relative">
      {Icon && <Icon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  </div>
);

export default IconInput;