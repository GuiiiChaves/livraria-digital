
import React from 'react';
import { useBooks } from '../context/BookContext';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';

const ReservedPage: React.FC = () => {
  const { getReservedBooks, isFavorite, toggleFavorite } = useBooks();
  const reservedBooks = getReservedBooks();

  return (
    <div className="pb-20 pt-4 px-4">
      <h1 className="text-2xl font-bold mb-6">Livros Reservados</h1>
      
      {reservedBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 text-center">
            Você ainda não reservou nenhum livro.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Reserve livros para lê-los mais tarde!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {reservedBooks.map(book => (
            <BookCard 
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              isFavorite={isFavorite(book.id)}
              onToggleFavorite={() => toggleFavorite(book.id)}
            />
          ))}
        </div>
      )}

      <Navbar />
    </div>
  );
};

export default ReservedPage;
