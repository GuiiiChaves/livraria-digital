
import React from 'react';
import { useBooks } from '../context/BookContext';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavoritePage: React.FC = () => {
  const { books, favoriteBooks, toggleFavorite } = useBooks();
  
  // Get favorite books
  const favorites = books.filter(book => favoriteBooks.includes(book.id));

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-2">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Meus favoritos</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500">Você ainda não tem favoritos</p>
          <Link to="/" className="mt-4 text-blue-500">Explorar livros</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map(book => (
            <BookCard 
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(book.id)}
            />
          ))}
        </div>
      )}

      <Navbar />
    </div>
  );
};

export default FavoritePage;
