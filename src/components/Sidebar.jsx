import React from 'react';
import Card from './Card';
import { ChevronRight } from 'lucide-react';

const Sidebar = ({ title, icon: Icon, items, selectedItem, onSelectItem, itemRenderer }) => (
  <Card>
    <div className="flex items-center mb-4">
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      <h2 className="font-semibold">{title}</h2>
    </div>
    <div className="space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelectItem(item)}
          className={`w-full text-left p-2 rounded flex items-center justify-between ${
            selectedItem && selectedItem.id === item.id ? 'bg-blue-100' : 'hover:bg-gray-100'
          }`}
        >
          {itemRenderer ? itemRenderer(item) : item.name}
          <ChevronRight className="w-4 h-4" />
        </button>
      ))}
    </div>
  </Card>
);

export default Sidebar;
