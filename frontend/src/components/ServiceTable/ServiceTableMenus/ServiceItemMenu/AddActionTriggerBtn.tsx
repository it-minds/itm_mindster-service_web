import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import React, { FC } from "react";

interface AddActionProps {
  serviceId: number;
}
// Currently breaks the from when used...
const AddActionTriggerBtn: FC<AddActionProps> = ({ serviceId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen}>Add action</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new action to service: {serviceId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* <ActionForm serviceId={serviceId}></ActionForm> */}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddActionTriggerBtn;
