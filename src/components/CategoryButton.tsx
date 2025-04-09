
import React from 'react';

interface CategoryButtonProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  icon, 
  label, 
  isActive = false, 
  onClick 
}) => {
  return (
    <button 
      className={`flex flex-col items-center space-y-1 ${isActive ? 'opacity-100' : 'opacity-70'}`}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img 
          src={icon} 
          alt={label} 
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs text-center">{label}</span>
    </button>
  );
};

export default CategoryButton;
