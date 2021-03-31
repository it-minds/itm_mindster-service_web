import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import ActionForm from "components/Forms/Action/ActionForm";
import React, { FC } from "react";

interface AddActionProps {
  serviceId: number;
}

const AddActionTriggerBtn: FC<AddActionProps> = ({ serviceId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button justifyContent="left" isFullWidth={true} size="sm" variant="ghost" onClick={onOpen}>
        Add action
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new action to service: {serviceId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ActionForm submitCallback={null}></ActionForm>
          </ModalBody>
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
