'use client';

import { useState } from "react";
import { 
  Box, 
  Select,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text
 } from "@chakra-ui/react";
import Pagination from "./pagination";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";

// Define an interface for the data items
interface DataItem {
  id: number;
  name: string;
  age: number;
}

// Define an interface for the header items
interface HeaderItem {
  key: string;
  label: string;
}

// Define the props for the DataTable component
interface DataTableProps {
  data: DataItem[];
  headers: HeaderItem[];
}

export default function DataTable({ data, headers}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <Box>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th key={index}>{header.label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((item, index) => (
              <Tr key={index}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.age}</Td>
                <Td>
                  <div className="flex flex-row gap-3 justify-center">
                    <EditButton />
                    <DeleteButton />
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <div className="flex flex-row justify-center mt-4 gap-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <div className="flex flex-row gap-2 items-center">
          <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>

          <Text className="flex text-base whitespace-nowrap"><span>items per page</span></Text>
        </div>
      </div>
    </Box>
  );
}