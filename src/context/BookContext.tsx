
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
  reservedBooks: string[];
  toggleFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  reserveBook: (bookId: string) => void;
  isReserved: (bookId: string) => boolean;
  getBooksByCategory: (category: string) => Book[];
  getBookById: (id: string) => Book | undefined;
  getReservedBooks: () => Book[];
}

// Create context
const BookContext = createContext<BookContextType | undefined>(undefined);

// Sample data
const sampleBooks: Book[] = [
  {
    id: "1",
    title: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    coverUrl: "https://m.media-amazon.com/images/I/71KIVYhFZhL._UF894,1000_QL80_.jpg",
    description: "As aventuras do detetive mais famoso do mundo.",
    categories: ["Ficção", "Mistério"]
  },
  {
    id: "2",
    title: "Dom Quixote",
    author: "Miguel de Cervantes",
    coverUrl: "https://images.tcdn.com.br/img/img_prod/980922/dom_quixote_75547_1_739ba8207c9fa969bdeb00315e5481dc.jpg",
    description: "A história de um cavalheiro que enlouquece após ler muitos livros de cavalaria.",
    categories: ["Clássico", "Aventura"]
  },
  {
    id: "3",
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    coverUrl: "https://m.media-amazon.com/images/I/612QiXA+FyL._AC_UF1000,1000_QL80_DpWeblab_.jpg",
    description: "Uma fábula sobre a revolução dos animais de uma granja contra seus donos humanos.",
    categories: ["Ficção", "Política"]
  },
  {
    id: "4",
    title: "Tudo é Rio",
    author: "Carla Madeira",
    coverUrl: "https://m.media-amazon.com/images/I/816Udvs9O7L._AC_UF1000,1000_QL80_.jpg",
    description: "Um romance sobre perdão e recomeços.",
    categories: ["Ficção", "Drama"]
  }
];

// Provider component
export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books] = useState<Book[]>(sampleBooks);
  const [favoriteBooks, setFavoriteBooks] = useState<string[]>([]);
  const [reservedBooks, setReservedBooks] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteBooks');
    if (savedFavorites) {
      setFavoriteBooks(JSON.parse(savedFavorites));
    }
  }, []);

  // Load reserved books from localStorage
  useEffect(() => {
    const savedReserved = localStorage.getItem('reservedBooks');
    if (savedReserved) {
      setReservedBooks(JSON.parse(savedReserved));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  // Save reserved books to localStorage
  useEffect(() => {
    localStorage.setItem('reservedBooks', JSON.stringify(reservedBooks));
  }, [reservedBooks]);

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

  const reserveBook = (bookId: string) => {
    setReservedBooks(prev => {
      if (!prev.includes(bookId)) {
        return [...prev, bookId];
      }
      return prev;
    });
  };

  const isReserved = (bookId: string): boolean => {
    return reservedBooks.includes(bookId);
  };

  const getBooksByCategory = (category: string): Book[] => {
    if (category === 'Todos') return books;
    return books.filter(book => book.categories.includes(category));
  };

  const getBookById = (id: string): Book | undefined => {
    return books.find(book => book.id === id);
  };

  const getReservedBooks = (): Book[] => {
    return books.filter(book => reservedBooks.includes(book.id));
  };

  return (
    <BookContext.Provider value={{
      books,
      favoriteBooks,
      reservedBooks,
      toggleFavorite,
      isFavorite,
      reserveBook,
      isReserved,
      getBooksByCategory,
      getBookById,
      getReservedBooks
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
