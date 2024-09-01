import EmployeeCreateForm from "@/app/components/ui/employees/employee-create-form";
import {
    Text,
    Heading,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CreateEmployee() {
    return (
        <main>
            <div>
                <Breadcrumb separator={<ChevronRightIcon className='h-4 w-4'/>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/employees">Employees</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" isCurrentPage>Create</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Heading>Create Employee</Heading>

                <Text className="flex flex-row mt-2">
                    Fill out the form below to create a new employee.
                </Text>
            </div>
            <EmployeeCreateForm />
        </main>
    );
}