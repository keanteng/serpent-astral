'use client';

import { useState } from 'react';
import { 
    Box, 
    Button, 
    Input,
    Text
} from '@chakra-ui/react';
import { EmployeeType } from '@/app/library/employees-definitions';
import Image from 'next/image';
import EmployeeSaveButton from './employee-save-button';
import EmployeeDeleteButton from './employee-delete-button';


interface EditFormProps {
    employee: EmployeeType | null;
}

const EmployeeEditForm: React.FC<EditFormProps> = ({ employee }) => {
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const defaultEmployee: EmployeeType = {
        id: '',
        age: 0,
        name: '',
        gender: '',
        date_of_birth: formatDate(new Date()),
        address: '',
        state: '',
        phone_number: '',
        email: '',
        nationality: '',
        resident_status: '',
        marital_status: '',
        role: '',
        salary: 0,
        hire_date: formatDate(new Date()),
        epf_number: '',
        socso_number: '',
        bank_account: ''
    };

    const [formData, setFormData] = useState<EmployeeType>(
        employee || defaultEmployee
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col mt-4 mb-3'>
                <Image 
                src = {`https://i.pravatar.cc/250?u=${formData.id}`}
                alt = {formData.name}
                width = {140}
                height = {140}
                unoptimized
                className="rounded-full mb-2 self-center shadow-md"
                />
                <div className='flex flex-col w-96 gap-2 mt-6'>
                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >ID</Text>
                        <span className='break-all text-sm font-mono w-60'>{formData.id}</span>
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Name</Text>
                        <Input 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder='Name'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Age</Text>
                        <Input 
                            type='number'
                            name='age' 
                            value={formData.age} 
                            onChange={handleChange} 
                            placeholder='Age'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Gender</Text>
                        <Input 
                            name='gender' 
                            value={formData.gender} 
                            onChange={handleChange} 
                            placeholder='Gender'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Date Of Birth</Text>
                        <Input 
                            type='date'
                            name='date_of_birth' 
                            value={formData.date_of_birth.split('T')[0]} 
                            onChange={handleChange} 
                            placeholder='Date of Birth'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Address</Text>
                        <Input 
                            name='address' 
                            value={formData.address} 
                            onChange={handleChange} 
                            placeholder='Address'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >State</Text>
                        <Input 
                            name='address' 
                            value={formData.state} 
                            onChange={handleChange} 
                            placeholder='State'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Phone Number</Text>
                        <Input 
                            name='Phone Number' 
                            value={formData.phone_number} 
                            onChange={handleChange} 
                            placeholder='Phone Number'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Email</Text>
                        <Input 
                            name='email' 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder='Email'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Nationality</Text>
                        <Input
                            name='nationality'
                            value={formData.nationality}
                            onChange={handleChange}
                            placeholder='Nationality'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Resident Status</Text>
                        <Input
                            name='resident_status'
                            value={formData.resident_status}
                            onChange={handleChange}
                            placeholder='Resident Status'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Marital Status</Text>
                        <Input
                            name='marital_status'
                            value={formData.marital_status}
                            onChange={handleChange}
                            placeholder='Marital Status'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Role</Text>
                        <Input
                            name='role'
                            value={formData.role}
                            onChange={handleChange}
                            placeholder='Role'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Salary</Text>
                        <Input
                            type='number'
                            name='salary'
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder='Salary'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Hire Date</Text>
                        <Input
                            type='date'
                            name='hire_date'
                            value={formData.hire_date.split('T')[0]}
                            onChange={handleChange}
                            placeholder='Hire Date'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >EPF Number</Text>
                        <Input
                            name='epf_number'
                            value={formData.epf_number}
                            onChange={handleChange}
                            placeholder='EPF Number'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >SOCSO Number</Text>
                        <Input
                            name='socso_number'
                            value={formData.socso_number}
                            onChange={handleChange}
                            placeholder='SOCSO Number'
                            size='sm'
                            width={60}
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Bank Account</Text>
                        <Input
                            name='bank_account'
                            value={formData.bank_account}
                            onChange={handleChange}
                            placeholder='Bank Account'
                            size='sm'
                            width={60}
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-row-reverse gap-2 mt-8'>
                <EmployeeDeleteButton />
                <EmployeeSaveButton />
            </div>
        </form>
    );
};

export default EmployeeEditForm;