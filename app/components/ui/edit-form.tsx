'use client';

import { useState } from 'react';
import {
    Box,
    Button,
    Input
} from '@chakra-ui/react';

interface FormData {
    id: number;
    name: string;
    age: number;
}

interface EditFormProps {
    data: FormData;
}

const EditForm: React.FC<EditFormProps> = ({ data }) => {
    const [formData, setFormData] = useState<FormData>(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Submitting form with data:', formData);
            const response = await fetch('/api/products/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            const updatedUser = await response.json();
            console.log('Updated user:', updatedUser);
            alert('Data updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Failed to update data');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box className='flex flex-col mt-4 mb-3 gap-2 w-60'>
                <div className='flex flex-row items-center gap-3'>
                    <label>Name: </label>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-row items-center gap-3'>
                    <label>Age: </label>
                    <Input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
            </Box>
            <Button type="submit">Update</Button>
        </form>
    );
};

export default EditForm;