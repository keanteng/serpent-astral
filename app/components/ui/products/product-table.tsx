'use client';

import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import {
    Input,
    TableContainer,
    Table,
    Thead,
    Tr,
    Td,
    Tbody,
    Th,
    Button
} from '@chakra-ui/react';
import ProductCreateButton from './product-create-button';
import ProductDeleteButton from './product-delete-button';
import ProductDetailsDrawer from './product-drawer';

interface Product {
  id: number;
  name: string;
  price: number;
}

const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            allProducts {
              id
              name
              price
            }
          }
        `,
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
      return [];
    }

    return result.data.allProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const searchProducts = async (term: string): Promise<Product[]> => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query SearchProducts($term: String!) {
            searchProducts(term: $term) {
              id
              name
              price
            }
          }
        `,
        variables: {
          term,
        },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
      return [];
    }

    return result.data.searchProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const ProductTable: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const allProducts = await fetchAllProducts();
    setProducts(allProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm === '') {
        const allProducts = await fetchAllProducts();
        setProducts(allProducts);
      } else {
        const results = await searchProducts(searchTerm);
        setProducts(results);
      }
      setLoading(false);
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setTerm(searchTerm);
    setLoading(true);
    debouncedSearch(searchTerm);
  };

  const handleOpenDrawer = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = () => {
    fetchData();
  };

  return (
    <div>
      <div className='flex flex-row gap-2'>
        <Input
          type="text"
          value={term}
          onChange={handleSearch}
          placeholder="Search for products..."
          w="70%"
        />
        <ProductCreateButton />
      </div>

      {loading && <p>Loading...</p>}

      {products.length > 0 && (
        <TableContainer>
            <Table>
            <Thead>
                <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {products.map((product) => (
                <Tr key={product.id}>
                    <Td>{product.id}</Td>
                    <Td>{product.name}</Td>
                    <Td>{product.price}</Td>
                    <Td className='flex flex-row gap-2'>
                    <Button onClick={() => handleOpenDrawer(product)} bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>View Details</Button>
                    <ProductDeleteButton id={product.id} onDelete={() => {
                        const updatedProducts = products.filter((p) => p.id !== product.id);
                        setProducts(updatedProducts);
                    }} />
                    </Td>
                </Tr>
                ))}
            </Tbody>
            </Table>
            <ProductDetailsDrawer
              isOpen={isDrawerOpen}
              onClose={handleCloseDrawer}
              product={selectedProduct}
              onEdit={handleEdit}
            />
        </TableContainer>
      )}
    </div>
  );
};

export default ProductTable;