import OrderTable from "@/app/components/ui/orders/order-table"
import {
    Heading,
    Text,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Products() {
    return (
        <main>
            <div className="flex flex-col">
                <Breadcrumb separator={<ChevronRightIcon className="h-4 w-4" />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" isCurrentPage>Order</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                
                <Heading>Orders</Heading>
                <Text className="mt-2 mb-2">
                    Here you can view all orders placed by customers
                </Text>
            </div>
            <div className="flex flex-col">
                <OrderTable />
            </div>
        </main>
    )
}