
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ 
  id, 
  title, 
  author, 
  coverUrl, 
  isFavorite = false,
  onToggleFavorite
}) => {
  return (
    <div className="relative rounded-md overflow-hidden shadow-md">
      <Link to={`/product/${id}`}>
        <img 
          src={coverUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-2">
          <h3 className="text-sm font-medium truncate">{title}</h3>
          <p className="text-xs text-gray-500">{author}</p>
        </div>
      </Link>
      <button 
        className="absolute top-2 right-2 bg-white rounded-full p-1"
        onClick={(e) => {
          e.preventDefault();
          if (onToggleFavorite) onToggleFavorite();
        }}
      >
        <Heart 
          size={18} 
          className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>
    </div>
  );
};

export default BookCard;
