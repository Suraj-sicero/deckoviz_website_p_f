import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface SimpleDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}

export const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  value,
  onChange,
  placeholder,
  options
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 text-left flex items-center justify-between hover:bg-white/90 hover:shadow-md text-sm"
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Simple backdrop */}
          <div 
            className="fixed inset-0 z-50" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Dropdown positioned absolutely below button */}
          <div className="absolute top-full left-0 right-0 mt-1 z-[100] bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-lg shadow-xl max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 hover:bg-purple-50/80 cursor-pointer transition-colors duration-200 border-b border-gray-100/50 last:border-b-0 text-sm"
              >
                <span className="text-gray-900">{option}</span>
                {value === option && (
                  <Check className="w-4 h-4 text-purple-600" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};