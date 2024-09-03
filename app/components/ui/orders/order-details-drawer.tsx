import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import OrderItems from './order-items';

interface Order {
  id: number;
  customer: string;
  date: string;
  // Add other fields as necessary
}

interface OrderDetailsDrawerProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedOrder: Order) => void;
}

const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({ order, isOpen, onClose, onUpdate }) => {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (order) {
      setCustomer(order.customer);
      setDate(order.date);
    }
  }, [order]);

  const handleUpdate = async () => {
    if (!order) return;

    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation UpdateOrder($id: Int!, $customer: String!, $date: String!) {
            updateOrder(id: $id, customer: $customer, date: $date) {
              id
              customer
              date
            }
          }
        `,
        variables: { id: order.id, customer, date: new Date(date).toISOString() },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
    } else {
      onUpdate(result.data.updateOrder);
      onClose();
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size='xl'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Order Details</DrawerHeader>
        <DrawerBody>
          <FormControl>
            <FormLabel>ID</FormLabel>
            <Input value={order?.id ?? ''} isReadOnly />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Customer</FormLabel>
            <Input value={customer} onChange={(e) => setCustomer(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={date ? new Date(date).toISOString().split('T')[0] : ''}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>
          {/* Add other order details here */}
          {order && <OrderItems order={order} />}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
            Save Order Details
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderDetailsDrawer;