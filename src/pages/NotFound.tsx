
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-24 w-24 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-foreground">404</h1>
        <h2 className="text-2xl font-medium mb-4 text-foreground">Страница не найдена</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Запрашиваемая страница не существует или была перемещена
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="px-6"
        >
          <Home className="mr-2 h-4 w-4" />
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
