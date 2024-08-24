import { Box, Button, HStack } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-row gap-4 items-center">
      <Button onClick={handlePrevious} disabled={currentPage === 1} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
        Previous
      </Button>
      <Box>
        Page {currentPage} of {totalPages}
      </Box>
      <Button onClick={handleNext} disabled={currentPage === totalPages} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;