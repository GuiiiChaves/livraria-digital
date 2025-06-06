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
  blockedBooks: Record<string, Date>;
  toggleFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  reserveBook: (bookId: string) => Promise<void>;
  isReserved: (bookId: string) => boolean;
  cancelReservation: (bookId: string) => Promise<void>;
  getBooksByCategory: (category: string) => Book[];
  getBookById: (id: string) => Book | undefined;
  getReservedBooks: () => Book[];
  isBookBlocked: (bookId: string) => boolean;
  getDaysUntilUnblocked: (bookId: string) => number;
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
  const [blockedBooks, setBlockedBooks] = useState<Record<string, Date>>({});

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

  // Helper function to calculate business days
  const addBusinessDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    let daysAdded = 0;
    
    while (daysAdded < days) {
      result.setDate(result.getDate() + 1);
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        daysAdded++;
      }
    }
    
    return result;
  };

  // Carrega dados personalizados do usuário logado
  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setFavoriteBooks(userData.favoriteBooks || []);
      setReservedBooks(userData.reservedBooks || []);
      
      // Carrega livros bloqueados específicos deste usuário
      if (userData.blockedBooks) {
        const blocked: Record<string, Date> = {};
        Object.entries(userData.blockedBooks).forEach(([bookId, dateString]) => {
          blocked[bookId] = new Date(dateString as string);
        });
        setBlockedBooks(blocked);
      } else {
        setBlockedBooks({});
      }
    } else {
      // Se não há usuário logado, limpa todos os dados
      setFavoriteBooks([]);
      setReservedBooks([]);
      setBlockedBooks({});
    }
  }, [getCurrentUserEmail()]);

  // Persiste favoritos no perfil do usuário
  useEffect(() => {
    updateUserData({ favoriteBooks });
  }, [favoriteBooks]);

  // Persiste reservas no perfil do usuário
  useEffect(() => {
    updateUserData({ reservedBooks });
  }, [reservedBooks]);

  // Persiste livros bloqueados específicos do usuário no perfil do usuário
  useEffect(() => {
    const email = getCurrentUserEmail();
    if (!email) return;
    
    // Converte as datas para string antes de salvar
    const blockedBooksToSave: Record<string, string> = {};
    Object.entries(blockedBooks).forEach(([bookId, date]) => {
      blockedBooksToSave[bookId] = date.toISOString();
    });
    updateUserData({ blockedBooks: blockedBooksToSave });
  }, [blockedBooks]);

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

  const isBookBlocked = (bookId: string): boolean => {
    const blockDate = blockedBooks[bookId];
    if (!blockDate) return false;
    
    const now = new Date();
    return now < blockDate;
  };

  const getDaysUntilUnblocked = (bookId: string): number => {
    const blockDate = blockedBooks[bookId];
    if (!blockDate) return 0;
    
    const now = new Date();
    if (now >= blockDate) return 0;
    
    const diffTime = blockDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const reserveBook = async (bookId: string) => {
    try {
      // Verifica se o livro está bloqueado
      if (isBookBlocked(bookId)) {
        const daysLeft = getDaysUntilUnblocked(bookId);
        console.error(`Livro ${bookId} está bloqueado. ${daysLeft} dias restantes.`);
        return;
      }

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
      const email = getCurrentUserEmail();
      if (!email) {
        console.error('Usuário não logado');
        return;
      }

      await api.delete(`/reservations/${bookId}`);
      
      // Remove o livro das reservas do usuário atual
      const newReservedBooks = reservedBooks.filter(id => id !== bookId);
      setReservedBooks(newReservedBooks);
      updateUserData({ reservedBooks: newReservedBooks });
      
      // Adiciona o livro aos bloqueados por 3 dias úteis apenas para este usuário
      const blockUntil = addBusinessDays(new Date(), 3);
      const newBlockedBooks = { ...blockedBooks, [bookId]: blockUntil };
      setBlockedBooks(newBlockedBooks);
      
      console.log(`Livro ${bookId} foi cancelado e bloqueado até ${blockUntil.toLocaleDateString()} para o usuário ${email}`);
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
      blockedBooks,
      toggleFavorite,
      isFavorite,
      reserveBook,
      isReserved,
      cancelReservation,
      getBooksByCategory,
      getBookById,
      getReservedBooks,
      isBookBlocked,
      getDaysUntilUnblocked
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
