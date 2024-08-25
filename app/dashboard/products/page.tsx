import DataTable from "@/app/components/ui/data-table";
import { data } from '@/app/scripts/tempData';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
} from "@chakra-ui/react";
import SearchBar from "@/app/components/ui/search-bar";
import CreateButton from "@/app/components/ui/create-button";

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

export default function Products() {

    const headers: HeaderItem[] = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "age", label: "Age" },
        { key: 'action', label: 'Action' }
    ];

    return (
        <main className="flex flex-col min-h-screen">
            <div className="flex flex-col">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#" isCurrentPage>Products</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Heading>
                    Serpent Astral Products
                </Heading>
            </div>

            <div className="flex flex-row gap-5 mt-4 md:w-4/5">
                <SearchBar />
                <CreateButton />
            </div>

            <div className="flex flex-col mt-6">
                <DataTable data={data} headers={headers}/>
            </div>
        </main>
    )
}