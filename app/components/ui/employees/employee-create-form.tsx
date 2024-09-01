'use client';
import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Input,
    Text,
    Select
} from '@chakra-ui/react';
import { EmployeeType } from '@/app/library/employees-definitions';


const EmployeeCreateForm: React.FC= () => {
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const defaultEmployee: EmployeeType = {
        id: '',
        age: 0,
        name: '',
        gender: 'Male',
        date_of_birth: formatDate(new Date()),
        address: '',
        state: '',
        phone_number: '',
        email: '',
        nationality: 'Malaysian',
        resident_status: 'Citizen',
        marital_status: 'Single',
        role: 'Driver',
        salary: 0,
        hire_date: formatDate(new Date()),
        epf_number: 0,
        socso_number: 0,
        bank_account: ''
    };

    const [formData, setFormData] = useState<EmployeeType>(
        defaultEmployee
    );

    useEffect(() => {
        const uuid = crypto.randomUUID().replace(/-/g, '');
        setFormData((prevFormData) => ({
            ...prevFormData,
            id: uuid,
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'age' || name === 'salary' || name === 'epf_number' || name === 'socso_number' ? parseInt(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date_of_birth: new Date(formData.date_of_birth).toISOString(),
            hire_date: new Date(formData.hire_date).toISOString(),
        };
        console.log('Form submitted:', formattedData);
        await createEmployeeData(formattedData);
    };

    const createEmployeeData = async(data: EmployeeType) => {
        const mutation = `
            mutation CreateEmployee($input: EmployeeUpdateInput!) {
                createEmployee(input: $input) {
                    id
                    name
                    age
                    gender
                    date_of_birth
                    address
                    state
                    phone_number
                    email
                    nationality
                    resident_status
                    marital_status
                    role
                    salary
                    hire_date
                    epf_number
                    socso_number
                    bank_account
                }           
            }
        `;
        const response = await fetch('/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    input: data,
                },
            }),
        });

        const result = await response.json();
        console.log('GraphQL response:', result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col mb-3'>
                <div className='flex flex-col w-96 gap-2 mt-6'>
                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >ID</Text>
                        <span className='break-all text-sm font-mono w-60' >{formData.id}</span>
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
                            isRequired
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
                            isRequired
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
                            isRequired
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
                            isRequired
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
                            isRequired
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >State</Text>
                        <Input 
                            name='state' 
                            value={formData.state} 
                            onChange={handleChange} 
                            placeholder='State'
                            size='sm'
                            width={60}
                            isRequired
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >Phone Number</Text>
                        <Input 
                            name='phone_number' 
                            value={formData.phone_number} 
                            onChange={handleChange} 
                            placeholder='Phone Number'
                            size='sm'
                            width={60}
                            isRequired
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
                            isRequired
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
                            isRequired
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
                            isRequired
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
                            isRequired
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
                            isRequired
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
                            isRequired
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
                            isRequired
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >EPF Number</Text>
                        <Input
                            type='number'
                            name='epf_number'
                            value={formData.epf_number}
                            onChange={handleChange}
                            placeholder='EPF Number'
                            size='sm'
                            width={60}
                            isRequired
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <Text className='font-bold' >SOCSO Number</Text>
                        <Input
                            type='number'
                            name='socso_number'
                            value={formData.socso_number}
                            onChange={handleChange}
                            placeholder='SOCSO Number'
                            size='sm'
                            width={60}
                            isRequired
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
                            isRequired
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-row-reverse gap-2 mt-8'>
                <Button bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }} type='submit'>
                    Create Employee
                </Button>
            </div>
        </form>
    );
};

export default EmployeeCreateForm;