import Image from "next/image"
import {
    Text
} from "@chakra-ui/react";
import { EmployeeType } from "@/app/library/employees-definitions";
import { 
    EnvelopeIcon,
    PhoneIcon
} from "@heroicons/react/24/outline";

export default function EmployeeCard(employee: EmployeeType) {
    return (
        <div className="flex flex-col max-w-60 text-xs shadow-xl rounded-xl p-2">
            <Image 
            src = {`https://i.pravatar.cc/250?u=${employee.id}`}
            alt = {employee.name}
            width = {240}
            height = {100}
            unoptimized
            className="rounded-lg mb-2"
            />
            <div className="flex flex-col items-center justify-center mb-2">
                <Text className="font-bold">{employee.name}</Text>
                <Text>{employee.role}</Text>
            </div>
            
            <div className="flex flex-row gap-2 items-center justify-center">
                <PhoneIcon className="h-4 w-4" />
                <Text>{employee.phone_number}</Text>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
                <EnvelopeIcon className="h-4 w-4" />
                <Text>{employee.email}</Text>
            </div>
      </div>
    )
}