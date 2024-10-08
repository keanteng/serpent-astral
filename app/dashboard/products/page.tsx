import ProductTable from "@/app/components/ui/products/product-table"
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
                        <BreadcrumbLink href="#" isCurrentPage>Products</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                
                <Heading>Products</Heading>
                <Text className="mt-2 mb-2">
                    Check out our latest products.
                </Text>
            </div>
            <div className="flex flex-col">
                <ProductTable />
            </div>
        </main>
    )
}