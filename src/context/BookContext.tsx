
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

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
  reserveBook: (bookId: string) => Promise<void>;
  isReserved: (bookId: string) => boolean;
  cancelReservation: (bookId: string) => Promise<void>;
  getBooksByCategory: (category: string) => Book[];
  getBookById: (id: string) => Book | undefined;
  getReservedBooks: () => Book[];
}

// Create context
const BookContext = createContext<BookContextType | undefined>(undefined);

const avatarMap: Record<string, string> = {
  'cyber-girl': 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
  'mystic-scholar': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'urban-explorer': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'creative-mind': 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=100&h=100&fit=crop&crop=face',
  'wise-guardian': 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
};

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

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books] = useState<Book[]>(sampleBooks);
  const [favoriteBooks, setFavoriteBooks] = useState<string[]>([]);
  const [reservedBooks, setReservedBooks] = useState<string[]>([]);

  const getCurrentUserEmail = () => localStorage.getItem('currentUserEmail');
  
  const getUserData = () => {
    const email = getCurrentUserEmail();
    if (!email) return null;
    
    const userData = localStorage.getItem(`user_${email}`);
    return userData ? JSON.parse(userData) : null;
  };

  const updateUserData = (updates: any) => {
    const email = getCurrentUserEmail();
    if (!email) return;
    
    const userData = getUserData() || {};
    const updatedData = { ...userData, ...updates };
    localStorage.setItem(`user_${email}`, JSON.stringify(updatedData));
  };

  // Carrega dados personalizados do usuário
  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setFavoriteBooks(userData.favoriteBooks || []);
      setReservedBooks(userData.reservedBooks || []);
    }
  }, []);

  // Persiste favoritos no perfil do usuário
  useEffect(() => {
    updateUserData({ favoriteBooks });
  }, [favoriteBooks]);

  // Persiste reservas no perfil do usuário
  useEffect(() => {
    updateUserData({ reservedBooks });
  }, [reservedBooks]);

  const toggleFavorite = (bookId: string) => {
    setFavoriteBooks(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const isFavorite = (bookId: string): boolean => {
    return favoriteBooks.includes(bookId);
  };

  const reserveBook = async (bookId: string) => {
    try {
      console.log('Reservando livro:', bookId);
      
      // Simula a API call
      await api.post('/reservations', { bookId });
      
      // Atualiza o estado local imediatamente
      const newReservedBooks = [...reservedBooks, bookId];
      setReservedBooks(newReservedBooks);
      updateUserData({ reservedBooks: newReservedBooks });
      
      console.log('Livro reservado com sucesso:', bookId);
      console.log('Livros reservados atualizados:', newReservedBooks);
    } catch (err) {
      console.error('Erro ao reservar livro:', err);
    }
  };

  const isReserved = (bookId: string): boolean => {
    const isReservedResult = reservedBooks.includes(bookId);
    console.log(`Verificando se livro ${bookId} está reservado:`, isReservedResult);
    console.log('Lista de reservados atual:', reservedBooks);
    return isReservedResult;
  };

  const cancelReservation = async (bookId: string) => {
    try {
      await api.delete(`/reservations/${bookId}`);
      const newReservedBooks = reservedBooks.filter(id => id !== bookId);
      setReservedBooks(newReservedBooks);
      updateUserData({ reservedBooks: newReservedBooks });
    } catch (err) {
      console.error('Erro ao cancelar reserva:', err);
    }
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
      cancelReservation,
      getBooksByCategory,
      getBookById,
      getReservedBooks
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = (): BookContextType => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
