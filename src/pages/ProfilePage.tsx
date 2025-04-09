
import React from 'react';
import { useBooks } from '../context/BookContext';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import BookCard from '../components/BookCard';
import CategoryButton from '../components/CategoryButton';

const ProfilePage: React.FC = () => {
  const { books, favoriteBooks, toggleFavorite } = useBooks();

  const categories = [
    { id: 'fiction', label: 'Ficção', icon: 'https://cdn-icons-png.flaticon.com/512/3845/3845826.png' },
    { id: 'mystery', label: 'Mistério', icon: 'https://cdn-icons-png.flaticon.com/512/3143/3143636.png' },
    { id: 'classic', label: 'Clássico', icon: 'https://cdn-icons-png.flaticon.com/512/2702/2702134.png' },
  ];

  return (
    <div className="pb-20 pt-4 px-4">
      <ProfileHeader 
        name="Jane Doe"
        avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
      />

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Categorias</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <CategoryButton 
              key={category.id}
              icon={category.icon}
              label={category.label}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Meus destaques</h2>
        <div className="grid grid-cols-2 gap-4">
          {books
            .filter(book => favoriteBooks.includes(book.id))
            .slice(0, 4)
            .map(book => (
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
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Todos os livros</h2>
        <div className="grid grid-cols-2 gap-4">
          {books.map(book => (
            <BookCard 
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              isFavorite={favoriteBooks.includes(book.id)}
              onToggleFavorite={() => toggleFavorite(book.id)}
            />
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default ProfilePage;
