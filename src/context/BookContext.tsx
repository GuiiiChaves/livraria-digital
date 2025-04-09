
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  categories: string[];
}

interface BookContextType {
  books: Book[];
  favoriteBooks: string[];
  toggleFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  getBooksByCategory: (category: string) => Book[];
  getBookById: (id: string) => Book | undefined;
}

// Create context
const BookContext = createContext<BookContextType | undefined>(undefined);

// Sample data
const sampleBooks: Book[] = [
  {
    id: "1",
    title: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    coverUrl: "/lovable-uploads/9544c276-86eb-4d42-84f6-9c710c59ec0b.png",
    description: "As aventuras do detetive mais famoso do mundo.",
    categories: ["Ficção", "Mistério"]
  },
  {
    id: "2",
    title: "Dom Quixote",
    author: "Miguel de Cervantes",
    coverUrl: "https://m.media-amazon.com/images/I/81wDJzLO+8L._AC_UF1000,1000_QL80_.jpg",
    description: "A história de um cavalheiro que enlouquece após ler muitos livros de cavalaria.",
    categories: ["Clássico", "Aventura"]
  },
  {
    id: "3",
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    coverUrl: "https://m.media-amazon.com/images/I/61olgPxp37L._AC_UF1000,1000_QL80_.jpg",
    description: "Uma fábula sobre a revolução dos animais de uma granja contra seus donos humanos.",
    categories: ["Ficção", "Política"]
  },
  {
    id: "4",
    title: "Tudo é Rio",
    author: "Carla Madeira",
    coverUrl: "https://m.media-amazon.com/images/I/71QXOoQ+JCL._AC_UF1000,1000_QL80_.jpg",
    description: "Um romance sobre perdão e recomeços.",
    categories: ["Ficção", "Drama"]
  }
];

// Provider component
export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books] = useState<Book[]>(sampleBooks);
  const [favoriteBooks, setFavoriteBooks] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteBooks');
    if (savedFavorites) {
      setFavoriteBooks(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  const toggleFavorite = (bookId: string) => {
    setFavoriteBooks(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId);
      } else {
        return [...prev, bookId];
      }
    });
  };

  const isFavorite = (bookId: string): boolean => {
    return favoriteBooks.includes(bookId);
  };

  const getBooksByCategory = (category: string): Book[] => {
    if (category === 'Todos') return books;
    return books.filter(book => book.categories.includes(category));
  };

  const getBookById = (id: string): Book | undefined => {
    return books.find(book => book.id === id);
  };

  return (
    <BookContext.Provider value={{
      books,
      favoriteBooks,
      toggleFavorite,
      isFavorite,
      getBooksByCategory,
      getBookById
    }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom hook to use the context
export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
