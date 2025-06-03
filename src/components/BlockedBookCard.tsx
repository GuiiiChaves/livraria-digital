
import React from 'react';
import { Clock } from 'lucide-react';
import { useBooks } from '../context/BookContext';

interface BlockedBookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  daysLeft: number;
}

const BlockedBookCard: React.FC<BlockedBookCardProps> = ({
  id,
  title,
  author,
  coverUrl,
  daysLeft
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden opacity-60">
      <div className="relative">
        <img 
          src={coverUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <Clock size={24} className="mx-auto mb-2" />
            <p className="text-sm font-medium">Bloqueado</p>
            <p className="text-xs">{daysLeft} dias restantes</p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-500 mb-1 line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-400">{author}</p>
      </div>
    </div>
  );
};

export default BlockedBookCard;
