
import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import Navbar from '../components/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReviewsTab from '../components/ReviewsTab';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <div className="pb-20">
      <ProfileHeader 
        name="Lionel Messi" 
        avatarUrl="https://www.ogol.com.br/img/jogadores/new/05/92/10592_lionel_messi_20250220100736.png" 
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
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Configurações da conta</h2>
            <p className="text-gray-500">Configurações da conta serão implementadas em breve.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Navbar />
    </div>
  );
};

export default ProfilePage;
