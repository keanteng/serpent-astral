'use client';

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
import { useEffect, useState } from "react";
import { EmployeeType } from "@/app/library/employees-definitions";
import Pagination from "../pagination";
import TableSkeleton from "./table-skeleton";
import EmployeeCard from "./employee-card";
import EmployeeDrawer from "./employee-drawer";

export default function EmployeesTable() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<{ employees: EmployeeType[] } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = searchTerm
    ? data?.employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data?.employees;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData?.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1); // Reset to first page when items per page changes
    };

    const openDrawer = (employee: EmployeeType) => {
      setSelectedEmployee(employee);
      setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
      setIsDrawerOpen(false);
      setSelectedEmployee(null);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetEmployees {
              employees {
                id
                age
                name
                gender
                date_of_birth
                address
                state
                phone_number
                email
                nationality
                resident_status
                marital_status
                role
                salary
                hire_date
                epf_number
                socso_number
                bank_account
              }
            }
          `,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setData(result.data);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };


  useEffect(() => {  
      fetchData();
    }, []);

    if (loading) return <TableSkeleton />;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <main>
      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-3/5"
      />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {currentData?.map((employee) => {
            return (
              <div key={employee.id} onClick={() => openDrawer(employee)}>
                <EmployeeCard {...employee} />
              </div>
          );
        })}
        </div>

        <div className="flex flex-row justify-center mt-8 gap-4">
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
        <EmployeeDrawer isOpen={isDrawerOpen} onClose={closeDrawer} employee={selectedEmployee} onDelete={fetchData} onEdit={fetchData} />
      </main>
    )
}