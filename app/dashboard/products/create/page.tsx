import {
    Text,
    Heading,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ProductCreateForm from "@/app/components/ui/products/product-create-form";

export default function CreateProduct() {
    return (
        <main>
            <div>
                <Breadcrumb separator={<ChevronRightIcon className='h-4 w-4'/>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" isCurrentPage>Create</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Heading>Create Employee</Heading>

                <Text className="flex flex-row mt-2">
                    Fill out the form below to create a new product.
                </Text>
            </div>

            <ProductCreateForm />
        </main>
    );
}