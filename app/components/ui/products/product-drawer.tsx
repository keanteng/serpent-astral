import React, { useState, useEffect } from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Input } from '@chakra-ui/react';

interface ProductDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
  } | null;
  onEdit: () => void;
}

const ProductDetailsDrawer: React.FC<ProductDetailsDrawerProps> = ({ isOpen, onClose, product, onEdit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
    }
  }, [product]);

  const handleSave = async () => {
    if (!product) return;

    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation UpdateProduct($id: Int!, $name: String, $price: Float) {
            updateProduct(id: $id, name: $name, price: $price) {
              id
              name
              price
            }
          }
        `,
        variables: {
          id: product.id,
          name,
          price: parseFloat(price),
        },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
    } else {
      console.log('Product updated:', result.data.updateProduct);
      onClose();
      onEdit();
    }
  };

  if (!product) return null;

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Product Details</DrawerHeader>
        <DrawerBody className='flex flex-col gap-2'>
          <div>
            <label>
              <strong>ID:</strong> {product.id}
            </label>
          </div>
          <div>
            <label>
              <strong>Name:</strong>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              <strong>Price:</strong>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
          </div>
          <Button mt={4} onClick={handleSave} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
            Save
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDetailsDrawer;