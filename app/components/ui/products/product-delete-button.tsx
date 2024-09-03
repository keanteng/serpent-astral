import React from 'react';
import {
    Button
} from '@chakra-ui/react';

interface ProductDeleteButtonProps {
  id: number;
  onDelete: () => void;
}

const ProductDeleteButton: React.FC<ProductDeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation DeleteProduct($id: Int!) {
            deleteProduct(id: $id) {
              id
              name
              price
            }
          }
        `,
        variables: {
          id,
        },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
    } else {
      console.log('Product deleted:', result.data.deleteProduct);
      onDelete();
    }
  };

  return (
    <Button onClick={handleDelete} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
      Delete
    </Button>
  );
};

export default ProductDeleteButton;