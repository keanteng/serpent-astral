import {
    Text,
    Heading,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import OrderCreateForm from "@/app/components/ui/orders/order-create-form";

export default function CreateOrder() {
    return (
        <main>
            <div className="mb-4">
                <Breadcrumb separator={<ChevronRightIcon className='h-4 w-4'/>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/orders">Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" isCurrentPage>Create</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Heading>Create Order</Heading>

                <Text className="flex flex-row mt-2">
                    Fill out the form below to create a new order.
                </Text>
            </div>
            <OrderCreateForm />
        </main>
    );
}