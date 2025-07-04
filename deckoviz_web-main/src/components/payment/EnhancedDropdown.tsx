import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  name: string;
  image?: string;
  price?: number;
  description?: string;
}

interface EnhancedDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: DropdownOption[];
  className?: string;
}

export const EnhancedDropdown: React.FC<EnhancedDropdownProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  options, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 text-left bg-gradient-to-br from-white/90 via-white/95 to-white/80 backdrop-blur-md border border-gray-200/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300/60 focus:border-purple-300/60 transition-all duration-300 hover:border-purple-200/60 hover:bg-gradient-to-br hover:from-white/95 hover:via-white/100 hover:to-white/90 hover:shadow-xl hover:shadow-purple-100/50 flex justify-between items-center group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 -skew-x-12"></div>
        <span className={`${value ? "text-gray-900 font-medium" : "text-gray-500"} transition-all duration-200 relative z-10`}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-all duration-300 relative z-10 ${isOpen ? "rotate-180 text-purple-600" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Simple backdrop */}
          <div 
            className="fixed inset-0 z-50" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Dropdown positioned absolutely below button */}
          <div className="absolute top-full left-0 right-0 mt-2 z-[100] bg-white/98 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl shadow-purple-100/20 max-h-96 overflow-y-auto">
            <div className="p-2">
              {options.map((option, index) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => {
                    onChange(option.name);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-purple-50/80 hover:via-pink-50/60 hover:to-purple-50/80 transition-all duration-200 rounded-xl group relative overflow-hidden my-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500 -skew-x-12"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    {option.image && (
                      <img 
                        src={option.image} 
                        alt={option.name} 
                        className="w-16 h-12 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="group-hover:text-purple-700 group-hover:font-medium transition-all duration-200 block truncate">
                        {option.name}
                      </span>
                      {option.price && (
                        <span className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors duration-200">
                          ${option.price}
                        </span>
                      )}
                      {option.description && (
                        <span className="text-xs text-gray-400 group-hover:text-purple-500 transition-colors duration-200 block truncate">
                          {option.description}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};