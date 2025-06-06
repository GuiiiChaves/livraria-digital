import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import Navbar from '../components/Navbar';
import { useToast } from '../hooks/use-toast';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, isFavorite, toggleFavorite, reserveBook, isReserved } = useBooks();
  const { toast } = useToast();
  
  const book = getBookById(id || '');
  
  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Livro não encontrado</p>
        <Link to="/" className="mt-4 text-purple-500">Voltar para a página inicial</Link>
      </div>
    );
  }

  const handleReserve = () => {
    reserveBook(book.id);
    toast({
      title: "Livro reservado!",
      description: `"${book.title}" foi adicionado aos seus livros reservados.`,
    });
  };

  // Mock reviews
  const reviews = [
    {
      name: "Neymar Júnior",
      date: "01/05/2025",
      rating: 5,
      comment: "Um clássico atemporal que todos deveriam ler. A narrativa é envolvente e os personagens são muito bem construídos.",
      avatarUrl: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2025/01/28/1624869969-por-que-neymar-esta-voltando-para-o-brasil-jogador-tomou-decisao-crucial-saiba-detalhes.jpg"
    },
    {
      name: "Cristiano Ronaldo",
      date: "07/07/2007",
      rating: 4,
      comment: "Gostei muito do livro, apesar de algumas partes serem um pouco lentas. Vale a pena a leitura.",
      avatarUrl: "https://assets.goal.com/images/v3/blt2aaca933046f8b00/Cristiano%20Ronaldo%20Portugal%202024%20(4).jpg"
    },
    {
      name: "Ronaldinho Gaúcho",
      date: "02/03/2023",
      rating: 5,
      comment: "Seguindo à risca o formato das histórias policiais clássicas, este livro entrega exatamente o que promete.",
      avatarUrl: "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/95/51/09/20410083.jpg"
    }
  ];

  // Recommended books with real titles and configurable image URLs
  const recommendedBooks = [
    {
      id: 1,
      title: "O Cortiço",
      author: "Aluísio Azevedo",
      imageUrl: "https://m.media-amazon.com/images/I/61KSQiD6CsL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 2,
      title: "Quincas Borba",
      author: "Machado de Assis",
      imageUrl: "https://m.media-amazon.com/images/I/61Kt3d+mhuL.jpg"
    },
    {
      id: 3,
      title: "O Guarani",
      author: "José de Alencar",
      imageUrl: "https://m.media-amazon.com/images/I/91-16juFmnL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 4,
      title: "Iracema",
      author: "José de Alencar",
      imageUrl: "https://m.media-amazon.com/images/I/71LCDi6E2oL.jpg"
    }
  ];

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="p-2">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex space-x-3">
          <button 
            className="p-2"
            onClick={() => toggleFavorite(book.id)}
          >
            <Heart 
              size={24} 
              className={isFavorite(book.id) ? "fill-red-500 text-red-500" : ""}
            />
          </button>
          <button className="p-2">
            <Share2 size={24} />
          </button>
        </div>
      </div>

      <div className="flex mb-6">
        <div className="w-1/3 mr-4">
          <img 
            src={book.coverUrl} 
            alt={book.title} 
            className="w-full object-cover shadow-md rounded-md"
          />
        </div>
        <div className="w-2/3">
          <h1 className="text-xl font-bold mb-1">{book.title}</h1>
          <p className="text-gray-700 mb-2">{book.author}</p>
          <p className="text-sm text-gray-600 mb-4">{book.description}</p>
          
          <button 
            className={`w-full py-2 rounded-md font-medium ${
              isReserved(book.id) 
                ? "bg-green-600 text-white cursor-not-allowed" 
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
            onClick={handleReserve}
            disabled={isReserved(book.id)}
          >
            {isReserved(book.id) ? "Reservado" : "Reservar"}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Reviews</h2>
        <div>
          {reviews.map((review, index) => (
            <ReviewCard 
              key={index}
              name={review.name}
              date={review.date}
              rating={review.rating}
              comment={review.comment}
              avatarUrl={review.avatarUrl}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-3">Ver mais recomendações</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-3">
            {recommendedBooks.map((recommendedBook) => (
              <div key={recommendedBook.id} className="w-24 flex-shrink-0">
                <img 
                  src={recommendedBook.imageUrl} 
                  alt={recommendedBook.title}
                  className="w-full h-32 object-cover rounded-md"
                />
                <p className="text-xs mt-1 font-medium truncate">{recommendedBook.title}</p>
                <p className="text-xs text-gray-500">{recommendedBook.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default ProductPage;
