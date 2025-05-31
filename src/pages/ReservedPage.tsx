
import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { Button } from '../components/ui/button';
import { X } from 'lucide-react';

const ReservedPage: React.FC = () => {
  const { getReservedBooks, isFavorite, toggleFavorite, cancelReservation } = useBooks();
  const reservedBooks = getReservedBooks();
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleCancelReservation = (bookId: string) => {
    cancelReservation(bookId);
    setSelectedBookId(null);
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <h1 className="text-2xl font-bold mb-6">Livros Reservados</h1>
      
      {reservedBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 text-center">
            Você ainda não reservou nenhum livro.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Reserve livros para lê-los mais tarde!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reservedBooks.map(book => (
            <div key={book.id} className="flex items-center bg-white rounded-lg shadow-sm p-4">
              <div className="flex-1">
                <BookCard 
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                  isFavorite={isFavorite(book.id)}
                  onToggleFavorite={() => toggleFavorite(book.id)}
                />
              </div>
              <div className="ml-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => setSelectedBookId(book.id)}
                    >
                      <X size={16} className="mr-1" />
                      Cancelar Reserva
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                      <AlertDialogDescription className="space-y-2">
                        <p>Tem certeza que deseja cancelar a reserva do livro "{book.title}"?</p>
                        <p className="text-sm text-orange-600 font-medium">
                          ⚠️ Após o cancelamento, uma nova reserva só poderá ser feita após 3 dias úteis.
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Não, manter reserva</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleCancelReservation(book.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Sim, cancelar reserva
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      <Navbar />
    </div>
  );
};

export default ReservedPage;
