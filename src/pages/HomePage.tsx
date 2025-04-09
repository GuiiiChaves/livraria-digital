
import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import CategoryButton from '../components/CategoryButton';

const categories = [
  { id: 'all', label: 'Todos', icon: 'https://cdn-icons-png.flaticon.com/512/3845/3845826.png' },
  { id: 'fiction', label: 'Ficção', icon: 'https://cdn-icons-png.flaticon.com/512/3845/3845826.png' },
  { id: 'mystery', label: 'Mistério', icon: 'https://cdn-icons-png.flaticon.com/512/3143/3143636.png' },
  { id: 'classic', label: 'Clássico', icon: 'https://cdn-icons-png.flaticon.com/512/2702/2702134.png' },
  { id: 'politics', label: 'Política', icon: 'https://cdn-icons-png.flaticon.com/512/2910/2910756.png' },
  { id: 'drama', label: 'Drama', icon: 'https://cdn-icons-png.flaticon.com/512/3277/3277425.png' },
];

const categoryToFilterMap: Record<string, string> = {
  'all': 'Todos',
  'fiction': 'Ficção',
  'mystery': 'Mistério',
  'classic': 'Clássico',
  'politics': 'Política',
  'drama': 'Drama',
};

const HomePage: React.FC = () => {
  const { books, isFavorite, toggleFavorite, getBooksByCategory } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter books by active category and search term
  const filteredBooks = getBooksByCategory(categoryToFilterMap[activeCategory])
    .filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Olá, Jane</h1>
          <p className="text-sm text-gray-500">O que vamos descobrir hoje?</p>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por título ou autor..."
      />

      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">Apenas para você</h2>
        <div className="grid grid-cols-2 gap-4">
          {books.slice(0, 2).map(book => (
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
      </div>

      <div className="mt-6 mb-2">
        <h2 className="text-lg font-medium mb-3">Ver todos</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <CategoryButton 
              key={category.id}
              icon={category.icon}
              label={category.label}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
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

      <Navbar />
    </div>
  );
};

export default HomePage;
