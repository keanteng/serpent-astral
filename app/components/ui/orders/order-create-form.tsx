'use client';

import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel, Box } from '@chakra-ui/react';

const OrderCreateForm: React.FC = () => {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Convert date to ISO 8601 format
    const isoDate = new Date(date).toISOString();

    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation CreateOrder($customer: String!, $date: String!) {
            createOrder(customer: $customer, date: $date) {
              id
              customer
              date
            }
          }
        `,
        variables: { customer, date: isoDate },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
    } else {
      console.log('Order created:', result.data.createOrder);
      alert('Order created successfully!');
      // Reset form fields
      setCustomer('');
      setDate('');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="lg">
      <FormControl mb={4}>
        <FormLabel>Customer</FormLabel>
        <Input
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          required
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </FormControl>
      <Button type="submit" bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
        Create Order
      </Button>
    </Box>
  );
};

export default OrderCreateForm;