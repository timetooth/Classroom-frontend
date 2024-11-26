import React, { useState } from 'react';
import Tab from './Tab';

const TabSystem = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = React.Children.toArray(children).filter(
    (child) => child.type === Tab
  );

  return (
    <div>
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.props.value}
            onClick={() => setActiveTab(tab.props.value)}
            className={`px-4 py-2 -mb-px ${
              activeTab === tab.props.value
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      {tabs.find((tab) => tab.props.value === activeTab)}
    </div>
  );
};

export default TabSystem;
