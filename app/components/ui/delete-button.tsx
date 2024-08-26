import {
    Button
} from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/outline';

interface DeleteButtonProps {
    id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/products/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete');
            }
            // Handle successful deletion (e.g., show a notification, refresh data)
        } catch (error) {
            console.error('Error deleting item:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <Button
            bg='black'
            size='sm'
            textColor='white'
            _hover={{ bg: 'yellow.500', textColor: 'black' }}
            onClick={handleDelete}
        >
            <TrashIcon className="h-4 w-4" />
        </Button>
    );
}