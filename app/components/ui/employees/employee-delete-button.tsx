import {
    Button
  } from '@chakra-ui/react';
  
  export default function EmployeeDeleteButton() {
  
    return (
        <Button bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
            <span>Delete Employee</span>
        </Button>
    );
  }