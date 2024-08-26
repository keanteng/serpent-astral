import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { filterDataByID } from '@/app/components/crud/actions';
import EditForm from '@/app/components/ui/edit-form';

export default async function Page({ params }: { params: { id: string }}) {
    const id = params.id;
    const [data] = await Promise.all([filterDataByID(Number(id))]);

    return (
    <main>
        <Breadcrumb separator={<ChevronRightIcon className='h-4 w-4'/>}>
            <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/products">
                    Products
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/products/1" isCurrentPage>
                    {id}
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href="#" isCurrentPage>Edit</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Heading>
            Spectral Astral Products
        </Heading>
        <div>
            {data && <EditForm data={data} />}
        </div>
    </main>
    );
}