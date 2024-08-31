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
        <div className="flex flex-col max-w-80 text-xs shadow-xl rounded-xl p-2 cursor-pointer">
            <Image 
            src = {`https://i.pravatar.cc/250?u=${employee.id}`}
            alt = {employee.name}
            width = {80}
            height = {80}
            unoptimized
            className="rounded-full mb-2 self-center shadow-md"
            />
            <div className="flex flex-col items-center justify-center mb-2 mt-2">
                <Text className="font-bold">{employee.name}</Text>
                <Text>{employee.role}</Text>
            </div>
            
            <div className="flex flex-row gap-2 items-center justify-center mb-1">
                <PhoneIcon className="h-3 w-3" />
                <Text>{employee.phone_number}</Text>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center mb-2">
                <EnvelopeIcon className="h-3 w-3" />
                <Text>{employee.email}</Text>
            </div>
      </div>
    )
}