import {
    Button
  } from '@chakra-ui/react';
  import { PlusCircleIcon } from '@heroicons/react/24/outline';
  import { useRouter } from 'next/navigation';
  
  export default function OrderCreateButton() {
    const router = useRouter();
  
    const handleClick = () => {
        router.push('/dashboard/orders/create');
    };
  
    return (
        <Button bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }} onClick={handleClick}>
            <span>New</span><PlusCircleIcon className="h-5 w-5 ml-2" />
        </Button>
    );
  }