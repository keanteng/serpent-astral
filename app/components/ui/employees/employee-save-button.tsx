import {
    Button
  } from '@chakra-ui/react';
  
  export default function EmployeeSaveButton() {
  
    return (
        <Button bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }}>
            <span>Save Edits</span>
        </Button>
    );
  }