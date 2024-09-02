'use client';

import React, { useState } from 'react';

const AddOrderItem = () => {
  const [customer, setCustomer] = useState<string>('');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [orderItems, setOrderItems] = useState<{ productId: number; quantity: number }[]>([]);

  const createOrder = async (customer: string) => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateOrder($customer: String!) {
              createOrder(customer: $customer) {
                id
                customer
                orderItems {
                  id
                  productId
                  quantity
                }
              }
            }
          `,
          variables: {
            customer,
          },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error(result.errors);
      } else {
        console.log(result.data);
        setOrderId(result.data.createOrder.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addOrderItemToList = (productId: number, quantity: number) => {
    setOrderItems([...orderItems, { productId, quantity }]);
    setProductId(null);
    setQuantity(1);
  };

  const submitOrderItems = async () => {
    if (orderId !== null) {
      for (const item of orderItems) {
        await addOrderItem(orderId, item.productId, item.quantity);
      }
      setOrderItems([]);
    }
  };

  const addOrderItem = async (orderId: number, productId: number, quantity: number) => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation AddOrderItem($orderId: Int!, $productId: Int!, $quantity: Int!) {
              addOrderItem(orderId: $orderId, productId: $productId, quantity: $quantity) {
                id
                productId
                quantity
              }
            }
          `,
          variables: {
            orderId,
            productId,
            quantity,
          },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error(result.errors);
      } else {
        console.log(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (customer !== '') {
      await createOrder(customer);
    }
  };

  const handleAddOrderItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (productId !== null) {
      addOrderItemToList(productId, quantity);
    }
  };

  const handleSubmitOrderItems = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOrderItems();
  };

  return (
    <div>
      <form onSubmit={handleCreateOrder}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <button type="submit">Create Order</button>
      </form>
      {orderId && (
        <>
          <form onSubmit={handleAddOrderItem}>
            <input
              type="number"
              placeholder="Product ID"
              value={productId ?? ''}
              onChange={(e) => setProductId(parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button type="submit">Add Order Item to List</button>
          </form>
          <ul>
            {orderItems.map((item, index) => (
              <li key={index}>
                Product ID: {item.productId}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={handleSubmitOrderItems}>Submit All Order Items</button>
        </>
      )}
    </div>
  );
};

export default AddOrderItem;