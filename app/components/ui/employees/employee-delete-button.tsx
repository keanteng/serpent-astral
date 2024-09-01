import {
    Button
  } from '@chakra-ui/react';

type EmployeeDeleteButtonProps = {
  id: string;
  onDelete: () => void;
};
  
const EmployeeDeleteButton: React.FC<EmployeeDeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
      const mutation = `
          mutation DeleteEmployee($id: String!) {
              deleteEmployee(id: $id) {
                  id
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
              variables: { id },
          }),
      });

      const result = await response.json();
      console.log('GraphQL response:', result);

      if (result.data.deleteEmployee.id) {
        onDelete(); // Call the callback function after successful deletion
    }
  };

  return (
      <Button bg='black' textColor='white' _hover={{ bg: 'yellow.500', textColor: 'black' }} onClick={handleDelete}>
          <span>Delete Employee</span>
      </Button>
  );
};

export default EmployeeDeleteButton;
 