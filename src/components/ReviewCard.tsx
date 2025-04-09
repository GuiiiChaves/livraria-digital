
import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  name, 
  date, 
  rating, 
  comment, 
  avatarUrl 
}) => {
  return (
    <div className="border-b border-gray-200 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {avatarUrl && (
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img 
                src={avatarUrl} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <p className="font-medium text-sm">{name}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <p className="text-sm mt-2">{comment}</p>
    </div>
  );
};

export default ReviewCard;
