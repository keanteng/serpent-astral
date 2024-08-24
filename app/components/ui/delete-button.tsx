import {
    Button
} from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function DeleteButton() {
    return (
    <Button bg='black' size='sm' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
        <TrashIcon className="h-4 w-4" />
    </Button>
    );
}