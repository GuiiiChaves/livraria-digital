
import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import Navbar from '../components/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReviewsTab from '../components/ReviewsTab';
import SettingsTab from '../components/SettingsTab';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [userName, setUserName] = useState('Usuário');
  const [userAvatar, setUserAvatar] = useState('cyber-girl');

  const avatarMap: Record<string, string> = {
    'cyber-girl': 'https://img.freepik.com/vetores-premium/robo-bonito-icon-ilustracao-conceito-de-icone-de-robo-de-tecnologia-isolado-estilo-cartoon-plana_138676-1219.jpg',
    'mystic-scholar': 'https://cdn-icons-png.flaticon.com/512/2793/2793202.png',
    'urban-explorer': 'https://cdn-icons-png.flaticon.com/512/5230/5230440.png',
    'creative-mind': 'https://img.freepik.com/vetores-premium/uma-rapariga-bonita-vestida-de-detective-com-uma-lupa-de-vetor-de-desenho-animado_1080480-51566.jpg?semt=ais_hybrid&w=740',
    'wise-guardian': 'https://cdn-icons-png.flaticon.com/512/2278/2278606.png',
  };

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedAvatar = localStorage.getItem('userAvatar');
    
    if (storedName) setUserName(storedName);
    if (storedAvatar) setUserAvatar(storedAvatar);
  }, []);

  const avatarImage = avatarMap[userAvatar] || avatarMap['cyber-girl'];

  const handleAvatarChange = (newAvatar: string) => {
    setUserAvatar(newAvatar);
    localStorage.setItem('userAvatar', newAvatar);
    
    // Atualiza também nos dados do usuário
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
      const userData = localStorage.getItem(`user_${currentUserEmail}`);
      if (userData) {
        const user = JSON.parse(userData);
        user.avatar = newAvatar;
        localStorage.setItem(`user_${currentUserEmail}`, JSON.stringify(user));
      }
    }
  };

  return (
    <div className="pb-20">
      <ProfileHeader 
        name={userName} 
        avatarUrl={avatarImage} 
      />
      
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="reviews" className="text-sm">Avaliações</TabsTrigger>
          <TabsTrigger value="settings" className="text-sm">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews">
          <ReviewsTab />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsTab 
            currentAvatar={userAvatar}
            onAvatarChange={handleAvatarChange}
          />
        </TabsContent>
      </Tabs>
      
      <Navbar />
    </div>
  );
};

export default ProfilePage;
