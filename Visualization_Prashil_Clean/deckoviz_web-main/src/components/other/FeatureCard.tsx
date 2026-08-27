import React from 'react';
import { FeatureCardProps } from '../../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group bg-white rounded-xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-primary-100">
      <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 group-hover:bg-primary-200 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-600 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
    </div>
  );
};

export default FeatureCard;