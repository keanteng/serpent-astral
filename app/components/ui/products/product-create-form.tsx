'use client';

import React, { useState } from 'react';
import {
    Input,
    Text,
    Button
} from '@chakra-ui/react';

const ProductCreateForm: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation CreateProduct($name: String!, $price: Float!) {
            createProduct(name: $name, price: $price) {
              id
              name
              price
            }
          }
        `,
        variables: {
          name,
          price: parseFloat(price),
        },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
    } else {
      console.log('Product created:', result.data.createProduct);
      alert('Product created!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <div className='mt-4'>
        <label>
          Product Name:
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
      </div>
      <Button type="submit" bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }} w={40}>Create Product</Button>
    </form>
  );
};

export default ProductCreateForm;