import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react';
import { EmployeeType } from '@/app/library/employees-definitions';
import EmployeeEditForm from './employee-editform';

interface EmployeeDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    employee: EmployeeType | null;
}

const EmployeeDrawer = ({ isOpen, onClose, employee }: EmployeeDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size='md'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Employee Details</DrawerHeader>

        <DrawerBody>
          <EmployeeEditForm employee={employee} />
        </DrawerBody>

      </DrawerContent>
    </Drawer>
  );
};

export default EmployeeDrawer;