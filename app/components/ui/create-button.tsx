import {
    Button
} from '@chakra-ui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function CreateButton() {
    return (
        <Button bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
            <span>Create</span><PlusCircleIcon className="h-5 w-5 ml-2" />
        </Button>
    );
}