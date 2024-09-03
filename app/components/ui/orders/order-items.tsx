import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, Select } from '@chakra-ui/react';
import { Order, OrderItem } from '@prisma/client';
import OrderItemDeleteButton from './order-items-delete-button';

interface Product {
  id: number;
  name: string;
  price: GLfloat;
}

interface OrderProps {
  id: number;
  customer: string;
  date: string;
}

interface OrderItemsProps {
  order: OrderProps;
}

const OrderItems: React.FC<OrderItemsProps> = ({ order }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newItem, setNewItem] = useState({ productId: '', quantity: 1 });

  useEffect(() => {
    // Fetch order items for the given order
    const fetchOrderItems = async () => {
      if (!order) return;

      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetOrderItems($orderId: Int!) {
              orderItems(orderId: $orderId) {
                id
                quantity
                productId
                orderId
              }
            }
          `,
          variables: { orderId: order.id },
        }),
      });

      const { data } = await response.json();
      setOrderItems(data.orderItems);
    };

    fetchOrderItems();
  }, [order.id]);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetProducts {
              products {
                id
                name
                price
              }
            }
          `,
        }),
      });

      const { data } = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const handleAddItem = async () => {
    if (!order) return;

    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation CreateOrderItem($orderId: Int!, $productId: Int!, $quantity: Int!) {
            createOrderItem(orderId: $orderId, productId: $productId, quantity: $quantity) {
              id
              quantity
              productId
              orderId
            }
          }
        `,
        variables: { orderId: order.id, productId: parseInt(newItem.productId, 10), quantity: newItem.quantity },
      }),
    });

    const { data } = await response.json();
    setOrderItems([...orderItems, data.createOrderItem]);
    setNewItem({ productId: '', quantity: 1 });
  };

  // Create a map of product IDs to product names and prices
  const productMap = products.reduce((acc, product) => {
    acc[product.id] = product.name;
    return acc;
  }, {} as { [key: number]: string });

  const productPriceMap = products.reduce((acc, product) => {
    acc[product.id] = product.price;
    return acc;
  }, {} as { [key: number]: number });

  // Calculate the total price
  const totalPrice = orderItems.reduce((total, item) => {
    return total + item.quantity * productPriceMap[item.productId];
  }, 0).toFixed(2);

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product ID</Th>
            <Th>Product Name</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderItems.map((item) => (
            <Tr key={item.id}>
              <Td>{item.productId}</Td>
              <Td>{productMap[item.productId]}</Td>
              <Td>{item.quantity}</Td>
              <Td>{(item.quantity * productPriceMap[item.productId]).toFixed(2)}</Td>
              <Td>
                <OrderItemDeleteButton id={item.id} onDelete={() => setOrderItems(orderItems.filter((i) => i.id !== item.id))} />
              </Td>
            </Tr>
          ))}
          <Tr>
            <Td colSpan={3} textAlign="right"><strong>Total</strong></Td>
          <Td><strong>{totalPrice}</strong></Td>
          </Tr>
        </Tbody>
      </Table>
      <Box mt={4} className='flex flex-col gap-2'>
        <Select
          placeholder="Select product"
          value={newItem.productId}
          onChange={(e) => setNewItem({ ...newItem, productId: e.target.value })}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Select>
        <Input
          placeholder="Quantity"
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
        />
        <Button onClick={handleAddItem} mt={2} w={40} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default OrderItems;