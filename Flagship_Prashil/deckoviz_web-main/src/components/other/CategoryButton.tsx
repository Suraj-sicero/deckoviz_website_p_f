import React from 'react';
import { CategoryProps } from '../../types';

const CategoryButton: React.FC<CategoryProps> = ({ name, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg transition-all duration-300 ${
        isSelected
          ? 'bg-primary-600 text-white shadow-md'
          : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
      }`}
    >
      {name}
    </button>
  );
};

export default CategoryButton;