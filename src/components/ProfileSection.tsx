
import React from 'react';
import { Star, StarHalf, Truck, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProfileSectionProps {
  name?: string;
  role?: string;
  rating?: number;
  reviewCount?: number;
  balance?: number;
  profileLevel?: number;
  levelName?: string;
  profileImage?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  name = "Иван Петров",
  role = "Перевозчик",
  rating = 4.7,
  reviewCount = 12,
  balance = 25640,
  profileLevel = 75,
  levelName = "Доверенный партнер",
  profileImage = "https://randomuser.me/api/portraits/men/42.jpg"
}) => {
  const navigate = useNavigate();
  
  // Generate rating stars
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300 h-4 w-4" />);
    }
    
    return stars;
  };
  
  const handleGoToWallet = () => {
    toast.info("Переход в раздел баланса");
    navigate('/wallet');
  };
  
  const handleGoToRating = () => {
    toast.info("Просмотр рейтинга");
    navigate('/rating');
  };
  
  const handleGoToProfileLevel = () => {
    toast.info("Информация об уровне профиля");
    navigate('/profile-level');
  };
  
  const handleGoToVehicles = () => {
    toast.info("Просмотр списка транспортных средств");
    navigate('/vehicles');
  };
  
  const handleGoToReviews = () => {
    toast.info("Просмотр всех отзывов");
    navigate('/reviews');
  };
  
  return (
    <section className="p-4">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-16 h-16 rounded-full border-2 border-blue-500 cursor-pointer hover:opacity-90"
            onClick={() => navigate('/profile')}
          />
          <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></span>
        </div>
        <div>
          <h2 
            className="text-xl font-bold dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => navigate('/profile')}
          >
            {name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{role}</p>
          <div className="flex items-center mt-1">
            <div className="flex">
              {renderStars()}
            </div>
            <span 
              className="text-gray-600 dark:text-gray-300 ml-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              onClick={handleGoToReviews}
            >
              ({reviewCount} отзывов)
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div 
          className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
          onClick={handleGoToWallet}
        >
          <p className="text-gray-600 dark:text-gray-300 text-sm">Баланс</p>
          <p className="font-bold dark:text-white">{balance.toLocaleString('ru-RU')} ₽</p>
        </div>
        <div 
          className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
          onClick={handleGoToRating}
        >
          <p className="text-gray-600 dark:text-gray-300 text-sm">Рейтинг</p>
          <div className="flex items-center">
            <p className="font-bold dark:text-white">{rating}</p>
            <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
          </div>
        </div>
      </div>
      
      <div 
        className="mb-6 cursor-pointer"
        onClick={handleGoToProfileLevel}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold dark:text-white">Уровень профиля</h3>
          <span className="text-sm text-blue-600 dark:text-blue-400">Подробнее</span>
        </div>
        <div className="text-sm flex justify-between mb-1">
          <span className="text-gray-600 dark:text-gray-300">{levelName}</span>
          <span className="text-blue-600 dark:text-blue-400">{profileLevel}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
            style={{ width: `${profileLevel}%` }}
          ></div>
        </div>
      </div>
      
      <div 
        className="mb-6 cursor-pointer"
        onClick={handleGoToVehicles}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold dark:text-white">Транспорт</h3>
          <span className="text-sm text-blue-600 dark:text-blue-400">Все</span>
        </div>
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
            <Truck className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="font-medium dark:text-white">Mercedes Actros 2545</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Г/п 20т | Тент 82м³ | A123BC777</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
