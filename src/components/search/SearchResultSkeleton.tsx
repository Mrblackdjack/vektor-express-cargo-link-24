
import { Skeleton } from "@/components/ui/skeleton";

const SearchResultSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between mb-2">
        <div className="flex space-x-1 items-center">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-14" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
      
      <div className="flex items-center mb-2">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <div className="h-2 w-2 rounded-full bg-gray-300 mr-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="ml-1 border-l border-dashed border-gray-300 dark:border-gray-600 h-4" />
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-gray-300 mr-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="text-right ml-4">
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
};

export default SearchResultSkeleton;
