
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewData {
  id: string;
  bookTitle: string;
  bookCover: string;
  rating: number;
  date: string;
  comment: string;
}

const mockReviews: ReviewData[] = [
  {
    id: "1",
    bookTitle: "Sherlock Holmes",
    bookCover: "/lovable-uploads/9544c276-86eb-4d42-84f6-9c710c59ec0b.png",
    rating: 4,
    date: "12/03/2023",
    comment: "Um clássico atemporal que todos deveriam ler. A narrativa é envolvente e os personagens são muito bem construídos."
  },
  {
    id: "2",
    bookTitle: "Dom Quixote",
    bookCover: "https://m.media-amazon.com/images/I/81wDJzLO+8L._AC_UF1000,1000_QL80_.jpg",
    rating: 5,
    date: "25/01/2023",
    comment: "Uma obra prima da literatura mundial. Cervantes cria uma história fascinante com personagens memoráveis."
  }
];

const ReviewsTab: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Minhas avaliações</h2>
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex p-4">
                <div className="w-16 h-24 mr-4 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={review.bookCover} 
                    alt={review.bookTitle} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{review.bookTitle}</h3>
                  <div className="flex items-center my-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i}
                        size={16}
                        className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
