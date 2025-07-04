import React from 'react';
import { Check } from 'lucide-react';
import { frameSizeOptions } from './data/productOptions';

interface SizeSelectorProps {
  selectedFrameSize: string;
  setSelectedFrameSize: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ 
  selectedFrameSize, 
  setSelectedFrameSize 
}) => (
  <div className="space-y-4">
    {frameSizeOptions.map((option) => (
      <div
        key={option.name}
        onClick={() => setSelectedFrameSize(option.name)}
        className={`cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden group ${
          selectedFrameSize === option.name
            ? 'border-purple-500 bg-gradient-to-r from-purple-50/80 to-pink-50/80 scale-105 shadow-lg'
            : 'border-gray-200/40 hover:border-purple-300/60 hover:shadow-md hover:bg-gradient-to-r hover:from-purple-50/40 hover:to-pink-50/40'
        }`}
      >
        <div className="flex items-center p-4 gap-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500 -skew-x-12"></div>
          <img 
            src={option.image} 
            alt={option.name} 
            className="w-20 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200 relative z-10"
          />
          <div className="flex-1 relative z-10">
            <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">{option.name}</h4>
            <p className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors duration-200">{option.description}</p>
            <p className="text-lg font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-200">${option.price}</p>
          </div>
          {selectedFrameSize === option.name && (
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center relative z-10">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);