
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

const avatarOptions = [
  { 
    id: 'cyber-girl', 
    image: 'https://img.freepik.com/vetores-premium/robo-bonito-icon-ilustracao-conceito-de-icone-de-robo-de-tecnologia-isolado-estilo-cartoon-plana_138676-1219.jpg',
    label: 'Cyber' 
  },
  { 
    id: 'mystic-scholar', 
    image: 'https://cdn-icons-png.flaticon.com/512/2793/2793202.png',
    label: 'Místico' 
  },
  { 
    id: 'urban-explorer', 
    image: 'https://cdn-icons-png.flaticon.com/512/5230/5230440.png', 
    label: 'Explorador' 
  },
  { 
    id: 'creative-mind', 
    image: 'https://img.freepik.com/vetores-premium/uma-rapariga-bonita-vestida-de-detective-com-uma-lupa-de-vetor-de-desenho-animado_1080480-51566.jpg?semt=ais_hybrid&w=740',
    label: 'Detetive' 
  },
  { 
    id: 'wise-guardian', 
    image: 'https://cdn-icons-png.flaticon.com/512/2278/2278606.png',
    label: 'Gamer' 
  },
];

interface SettingsTabProps {
  currentAvatar: string;
  onAvatarChange: (avatar: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ currentAvatar, onAvatarChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Avatar</CardTitle>
          <CardDescription>Escolha seu avatar personalizado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Selecione um avatar</Label>
            <div className="grid grid-cols-3 gap-3">
              {avatarOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onAvatarChange(option.id)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                    currentAvatar === option.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={option.image} 
                      alt={option.label}
                      className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-white shadow-md"
                    />
                    {currentAvatar === option.id && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conta</CardTitle>
          <CardDescription>Gerenciar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleLogout}
            variant="destructive" 
            className="w-full"
          >
            Sair da Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
