
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around items-center">
        <Link to="/" className={`flex flex-col items-center ${isActive('/') ? 'text-blue-500' : 'text-gray-500'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Início</span>
        </Link>
        <Link to="/favorites" className={`flex flex-col items-center ${isActive('/favorites') ? 'text-blue-500' : 'text-gray-500'}`}>
          <Heart size={24} />
          <span className="text-xs mt-1">Favoritos</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center ${isActive('/profile') ? 'text-blue-500' : 'text-gray-500'}`}>
          <User size={24} />
          <span className="text-xs mt-1">Perfil</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
