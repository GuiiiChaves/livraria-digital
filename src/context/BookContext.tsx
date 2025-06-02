
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

  // Carrega favoritos do localStorage
  useEffect(() => {
    const fav = localStorage.getItem('favoriteBooks');
    if (fav) setFavoriteBooks(JSON.parse(fav));
  }, []);

  // Persiste favoritos
  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  // Carrega reservas do back-end
  useEffect(() => {
    fetchReservedBooks();
  }, []);

  const fetchReservedBooks = async () => {
    try {
      const { data } = await api.get<{ book: Book }[]>('/reservations');
      // supondo retorno [ { book: Book, … }, … ]
      const ids = data.map(r => r.book.id);
      setReservedBooks(ids);
    } catch (err) {
      console.error('Erro ao buscar reservas:', err);
    }
  };

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
      await api.post('/reservations', { bookId });
      // após criar, recarrega lista
      await fetchReservedBooks();
    } catch (err) {
      console.error('Erro ao reservar livro:', err);
    }
  };

  const isReserved = (bookId: string): boolean => {
    return reservedBooks.includes(bookId);
  };

  const cancelReservation = async (bookId: string) => {
    try {
      await api.delete(`/reservations/${bookId}`);
      // atualiza imediatamente para UX
      setReservedBooks(prev => prev.filter(id => id !== bookId));
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
