
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Users, UserPlus, Shield, ChevronLeft, Trash2, Edit } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  isActive: boolean;
}

const RolesPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: 'Иван Петров',
      email: 'ivan@example.com',
      role: 'Администратор',
      permissions: ['Просмотр', 'Редактирование', 'Удаление'],
      isActive: true
    },
    {
      id: 2,
      name: 'Алексей Смирнов',
      email: 'alexey@example.com',
      role: 'Менеджер',
      permissions: ['Просмотр', 'Редактирование'],
      isActive: true
    },
    {
      id: 3,
      name: 'Ольга Иванова',
      email: 'olga@example.com',
      role: 'Оператор',
      permissions: ['Просмотр'],
      isActive: false
    }
  ]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const toggleMemberStatus = (id: number) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === id ? { ...member, isActive: !member.isActive } : member
      )
    );
    
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      toast.success(`Статус ${member.name} изменен на ${!member.isActive ? 'активный' : 'неактивный'}`);
    }
  };

  const handleAddTeamMember = () => {
    toast.info('Открытие формы добавления сотрудника');
  };

  const handleEditMember = (id: number) => {
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      toast.info(`Редактирование ${member.name}`);
    }
  };

  const handleDeleteMember = (id: number) => {
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      toast.success(`${member.name} удален из команды`);
      setTeamMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen pb-20">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={true}
        toggleAuthModal={() => {}}
      />
      
      <main className="p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')}
            className="mr-2"
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">Роли и доступы</h1>
        </div>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Ваша роль</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Администратор</p>
                <p className="text-sm text-gray-500">Полный доступ ко всем функциям</p>
              </div>
              <Badge>Основной</Badge>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Перевозчик</span>
                </label>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-500" />
                  <span>Грузовладелец</span>
                </label>
                <Switch checked={false} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Команда</CardTitle>
            <Button 
              size="sm" 
              onClick={handleAddTeamMember}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Добавить
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map(member => (
                <div key={member.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2">{member.role}</Badge>
                        {member.isActive ? (
                          <Badge className="bg-green-500">Активен</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">Неактивен</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditMember(member.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {member.permissions.map((perm, i) => (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {perm}
                        </span>
                      ))}
                    </div>
                    <Switch 
                      checked={member.isActive} 
                      onCheckedChange={() => toggleMemberStatus(member.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default RolesPage;
