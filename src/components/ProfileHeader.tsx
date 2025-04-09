
import React from 'react';

interface ProfileHeaderProps {
  name: string;
  avatarUrl: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, avatarUrl }) => {
  return (
    <div className="flex flex-col items-center mt-6 mb-6">
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
        <img 
          src={avatarUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-2 text-md font-medium">{name}</p>
      <p className="text-sm text-gray-500">Olá, uma sugestão de leitura?</p>
      <button className="mt-3 bg-black text-white text-sm rounded-full px-4 py-1">
        Indicar um livro
      </button>
    </div>
  );
};

export default ProfileHeader;
