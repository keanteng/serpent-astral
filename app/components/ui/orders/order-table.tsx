'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Button, useDisclosure } from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import OrderDetailsDrawer from './order-details-drawer';
import OrderDeleteButton from './order-delete-button';
import OrderCreateButton from './order-create-button';

interface Order {
  id: number;
  customer: string;
  date: string;
  // Add other fields as necessary
}

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchOrders = async () => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            orders {
              id
              customer
              date
            }
          }
        `,
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
    } else {
      setOrders(result.data.orders);
    }
  };

  const searchOrders = async (term: string) => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query SearchOrders($term: String!) {
            searchOrders(term: $term) {
              id
              customer
              date
            }
          }
        `,
        variables: { term },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
    } else {
      setOrders(result.data.searchOrders);
    }
  };

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      searchOrders(term);
    }, 300),
    []
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      fetchOrders();
    }
  }, [searchTerm, debouncedSearch]);

  const handleOpenDrawer = (order: Order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
  };

  const handleDeleteOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <>
      <div className='flex flex-row gap-4 w-4/5'>
        <Input
          placeholder="Search by customer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={4}
        />
        <OrderCreateButton />
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{new Date(order.date).toLocaleDateString()}</Td>
              <Td className='flex flex-row gap-2'>
                <Button onClick={() => handleOpenDrawer(order)} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>View Details</Button>
                <OrderDeleteButton id={order.id} onDelete={handleDeleteOrder} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedOrder && (
        <OrderDetailsDrawer order={selectedOrder} isOpen={isOpen} onClose={onClose} onUpdate={handleUpdateOrder}/>
      )}
    </>
  );
};

export default OrderTable;