import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    completed: { bg: 'bg-green-100', text: 'text-green-800', icon: Check },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
    overdue: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
  };

  const style = statusStyles[status];
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      <Icon className="w-4 h-4 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
