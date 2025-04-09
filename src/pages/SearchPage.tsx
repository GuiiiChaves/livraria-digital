
import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const { books, isFavorite, toggleFavorite } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter books by search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { name: 'Tecnologia', active: false },
    { name: 'Ficção', active: true },
    { name: 'Saúde', active: false },
  ];

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-2">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex-1">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar livros..."
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Categorias</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
                category.active 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-3">Ver todos</h2>
        {searchTerm && filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500">Nenhum resultado encontrado para "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredBooks.map(book => (
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
      </div>

      <Navbar />
    </div>
  );
};

export default SearchPage;
