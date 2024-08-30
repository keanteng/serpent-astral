import {
  Box,
  SkeletonCircle,
  SkeletonText
} from "@chakra-ui/react";

const TableSkeleton: React.FC = () => {
    return (
      <Box>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
      </Box>
    );
  };
  
  export default TableSkeleton;