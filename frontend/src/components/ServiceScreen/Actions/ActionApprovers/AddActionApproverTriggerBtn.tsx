import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import ServiceOwnerForm from "components/Forms/Service/ServiceOwnerForm";
import React, { FC, useCallback } from "react";
import { IActionApproverDto, IActionIdDto } from "services/backend/nswagts";

type Props = {
  currAction: IActionIdDto;
  submitCallback: (Approvers: IActionApproverDto[]) => Promise<void>;
};
const AddActionApproverTriggerBtn: FC<Props> = ({ currAction, submitCallback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useCallback(async (approvers: IActionApproverDto[]) => {
    await submitCallback(approvers);
    onClose();
  }, []);

  return (
    <>
      <Button onClick={onOpen} borderWidth="1px" borderColor="black" bgColor="green">
        Add owners
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add approvers to: {currAction.title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ServiceOwnerForm submitCallback={handleSubmit} />
          </ModalBody>
          <Divider />
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

export default AddActionApproverTriggerBtn;
