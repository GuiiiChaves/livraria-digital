
import React, { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import CategoryButton from '../components/CategoryButton';
import { User, Mail, Phone, CreditCard, BookOpen } from 'lucide-react';

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

const avatarIcons = {
  user: User,
  mail: Mail,
  phone: Phone,
  card: CreditCard,
  book: BookOpen,
};

const HomePage: React.FC = () => {
  const { books, isFavorite, toggleFavorite, getBooksByCategory } = useBooks();
  const [activeCategory, setActiveCategory] = useState('all');
  const [userName, setUserName] = useState('Usuário');
  const [userAvatar, setUserAvatar] = useState('user');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedAvatar = localStorage.getItem('userAvatar');
    
    if (storedName) setUserName(storedName);
    if (storedAvatar) setUserAvatar(storedAvatar);
  }, []);

  const filteredBooks = getBooksByCategory(categoryToFilterMap[activeCategory]);
  const AvatarIcon = avatarIcons[userAvatar as keyof typeof avatarIcons] || User;

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Olá, {userName}</h1>
          <p className="text-sm text-gray-500">O que vamos descobrir hoje?</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <AvatarIcon className="w-6 h-6 text-purple-600" />
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
