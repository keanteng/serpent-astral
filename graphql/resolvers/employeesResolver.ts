import prisma from "@/prisma/lib/prisma";
import { create } from "domain";

type EmployeeUpdateInput = {
    id: string;
    age: number;
    name: string;
    gender: string;
    date_of_birth: Date; // or Date if you are using Date objects
    address: string;
    state: string;
    phone_number: string;
    email: string;
    nationality: string;
    resident_status: string;
    marital_status: string;
    role: string;
    salary: number;
    hire_date: Date; // or Date if you are using Date objects
    epf_number: number;
    socso_number: number;
    bank_account: string;
};

export const employeesResolvers = {
    Query: {
        employees: async () => {
            return await prisma.employee.findMany();
        },
    },

    Mutation: {
        updateEmployee: async (_: any, {input}:{input:EmployeeUpdateInput}) => {
            const { id, ...data } = input;
            return prisma.employee.update({
                where: { id: input.id },
                data,
            });
        },
        createEmployee: async (_: any, {input}:{input:EmployeeUpdateInput}) => {
            return prisma.employee.create({
                data: input,
            });
        },
    }
}