import React from 'react';

const SelectButton = ({ List, selected, onToggle }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {List && List.map((item) => (
        <button
          key={item.id}
          className={`px-3 py-1 border rounded ${
            selected.includes(item.id)
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => onToggle(item.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default SelectButton;