import React from 'react';
import { Button } from '@chakra-ui/react';

interface OrderItemDeleteButtonProps {
  id: number;
  onDelete: () => void;
}

const OrderItemDeleteButton: React.FC<OrderItemDeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation DeleteOrderItem($id: Int!) {
            deleteOrderItem(id: $id) {
              id
              quantity
              productId
              orderId
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
      console.log('Order item deleted:', result.data.deleteOrderItem);
      onDelete();
    }
  };

  return (
    <Button onClick={handleDelete} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }} size='xs'>
      Delete
    </Button>
  );
};

export default OrderItemDeleteButton;