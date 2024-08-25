import {
    Button
} from '@chakra-ui/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname } from 'next/navigation';

interface EditButtonProps {
    id: string;
}

export default function EditButton({ id }: EditButtonProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleEdit = () => {
        router.push(`${pathname}/${id}/edit`);
    };

    return (
        <Button size='sm' bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }} onClick={handleEdit}>
            <PencilSquareIcon className="h-4 w-4" />
        </Button>
    );
}