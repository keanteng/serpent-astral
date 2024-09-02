import {
  Box,
  SkeletonCircle,
  SkeletonText
} from "@chakra-ui/react";

const TableSkeleton: React.FC = () => {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({length:12}).map((_,index) => (
        <div key={index} className="flex flex-col max-w-80 text-xs shadow-xl rounded-xl p-2 cursor-pointer animate-pulse">
          <div className="rounded-full mb-2 self-center shadow-md bg-gray-300 w-20 h-20"></div>
          <div className="flex flex-col items-center justify-center mb-2 mt-2">
              <div className="bg-gray-300 h-4 w-24 mb-1 rounded"></div>
              <div className="bg-gray-300 h-3 w-16 rounded"></div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center mb-1">
              <div className="bg-gray-300 h-3 w-3 rounded-full"></div>
              <div className="bg-gray-300 h-3 w-20 rounded"></div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center mb-2">
              <div className="bg-gray-300 h-3 w-3 rounded-full"></div>
              <div className="bg-gray-300 h-3 w-20 rounded"></div>
          </div>
        </div>
        ))}
      </div>
    );
  };
  
  export default TableSkeleton;
