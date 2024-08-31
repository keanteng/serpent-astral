'use client';

import EmployeesTable from "@/app/components/ui/employees/employees-table"
import {
    Text,
    Heading,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import EmployeeCreateButton from "@/app/components/ui/employees/employee-create-button";
import EmployeeSearchBar from "@/app/components/ui/employees/employee-searchbar";

export default function Employees() {
    return (
        <main>
            <div className="flex flex-col mb-8 gap-2">
                <Breadcrumb separator={<ChevronRightIcon className='h-4 w-4'/>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" isCurrentPage>Employees</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Heading>Spectral Astral Employees</Heading>

                <Text className="mt-2">
                Our employees are the backbone of our success. At Spectral Astral, 
                we are committed to fostering a collaborative and innovative work 
                environment.
                </Text>

                <div className="flex flex-row w-5/6 gap-4 mt-2">
                    <EmployeeSearchBar />
                    <EmployeeCreateButton />
                </div>
            </div>
            <EmployeesTable />
        </main>
    )
}