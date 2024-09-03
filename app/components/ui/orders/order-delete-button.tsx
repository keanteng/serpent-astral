import React from 'react';
import { Button } from '@chakra-ui/react';

interface DeleteButtonProps {
  id: number;
  onDelete: (id: number) => void;
}

const OrderDeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation DeleteOrder($id: Int!) {
            deleteOrder(id: $id) {
              id
            }
          }
        `,
        variables: { id },
      }),
    });

    const result = await response.json();
    if (result.errors) {
        alert('Error deleting order. It may be referenced by other records.');
      console.error(result.errors);
    } else {
      onDelete(id);
    }
  };

  return (
    <Button onClick={handleDelete} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
      Delete
    </Button>
  );
};

export default OrderDeleteButton;