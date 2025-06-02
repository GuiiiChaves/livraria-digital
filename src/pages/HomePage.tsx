import React, { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import Navbar from '../components/Navbar';
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

const avatarMap: Record<string, string> = {
  'modern-woman': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face',
  'mage': 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=100&fit=crop&crop=center',
  'tech-person': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=face',
  'robot-knight': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=center',
  'scholar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
};

const HomePage: React.FC = () => {
  const { books, isFavorite, toggleFavorite, getBooksByCategory } = useBooks();
  const [activeCategory, setActiveCategory] = useState('all');
  const [userName, setUserName] = useState('Usuário');
  const [userAvatar, setUserAvatar] = useState('modern-woman');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedAvatar = localStorage.getItem('userAvatar');
    
    if (storedName) setUserName(storedName);
    if (storedAvatar) setUserAvatar(storedAvatar);
  }, []);

  const filteredBooks = getBooksByCategory(categoryToFilterMap[activeCategory]);
  const avatarImage = avatarMap[userAvatar] || avatarMap['modern-woman'];

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Olá, {userName}</h1>
          <p className="text-sm text-gray-500">O que vamos descobrir hoje?</p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img 
            src={avatarImage} 
            alt="Avatar do usuário"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

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
