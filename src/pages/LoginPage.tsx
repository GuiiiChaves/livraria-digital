
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    label: 'Mago' 
  },
  { 
    id: 'urban-explorer', 
    image: 'https://cdn-icons-png.flaticon.com/512/5230/5230440.png
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
    label: 'Jogador' 
  },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState('cyber-girl');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', loginData);
    
    // Busca dados do usuário baseado no email
    const userData = localStorage.getItem(`user_${loginData.email}`);
    if (userData) {
      const user = JSON.parse(userData);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUserEmail', loginData.email);
      localStorage.setItem('userAvatar', user.avatar);
      localStorage.setItem('userName', user.fullName);
    } else {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUserEmail', loginData.email);
      localStorage.setItem('userAvatar', selectedAvatar);
      localStorage.setItem('userName', 'Usuário');
    }
    
    navigate('/home');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    
    console.log('Cadastro:', registerData, 'Avatar:', selectedAvatar);
    
    // Salva dados do usuário com chave única baseada no email
    const userData = {
      fullName: registerData.fullName,
      cpf: registerData.cpf,
      phone: registerData.phone,
      email: registerData.email,
      avatar: selectedAvatar,
      favoriteBooks: [],
      reservedBooks: []
    };
    
    localStorage.setItem(`user_${registerData.email}`, JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUserEmail', registerData.email);
    localStorage.setItem('userAvatar', selectedAvatar);
    localStorage.setItem('userName', registerData.fullName);
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-purple-600">Livraria Digital</CardTitle>
          <CardDescription>Entre ou crie sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Entrar
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    placeholder="Seu nome completo"
                    value={registerData.fullName}
                    onChange={(e) => setRegisterData({...registerData, fullName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={registerData.cpf}
                    onChange={(e) => setRegisterData({...registerData, cpf: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerEmail">Email</Label>
                  <Input
                    id="registerEmail"
                    type="email"
                    placeholder="seu@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Senha</Label>
                  <Input
                    id="registerPassword"
                    type="password"
                    placeholder="Digite uma senha"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Escolha seu avatar</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {avatarOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedAvatar(option.id)}
                        className={`flex flex-col items-center p-2 rounded-lg border-2 transition-colors ${
                          selectedAvatar === option.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="relative">
                          <img 
                            src={option.image} 
                            alt={option.label}
                            className="w-12 h-12 rounded-full object-cover mb-1 border-2 border-white shadow-md"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <span className="text-xs font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Criar Conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
