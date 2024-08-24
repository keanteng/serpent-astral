import {
    Button
} from '@chakra-ui/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function EditButton() {
    return (
    <Button size='sm' bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
        <PencilSquareIcon className="h-4 w-4" />
    </Button>
    );
}