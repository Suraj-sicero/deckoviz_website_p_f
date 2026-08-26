import React from 'react';
import { StepProps } from '../../types';

const Step: React.FC<StepProps> = ({ number, title, description, isLast = false }) => {
  return (
    <div className="relative pl-16">
      <div className="absolute left-0 top-0 flex items-center justify-center">
        <div className="rounded-full w-12 h-12 border-2 border-primary-600 flex items-center justify-center text-primary-600 font-bold z-10 bg-white">
          {number}
        </div>
        
        {!isLast && (
          <div className="absolute top-full h-24 w-0.5 bg-primary-200 left-1/2 transform -translate-x-1/2"></div>
        )}
      </div>
      
      <h3 className="text-3xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 max-w-md">{description}</p>
    </div>
  );
};

export default Step;