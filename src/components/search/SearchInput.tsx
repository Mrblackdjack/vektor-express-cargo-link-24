
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onSubmit?: () => void;
  className?: string;
  autoFocus?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Номер заказа, маршрут, груз...", 
  onSubmit,
  className = "",
  autoFocus = false
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={`relative mb-4 ${className}`}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default SearchInput;
