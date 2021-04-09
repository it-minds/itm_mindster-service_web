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
import PopoverMenuButton from "components/Common/PopoverMenuButton";
import ActionApproverForm from "components/Forms/Service/ActionApproverForm";
import React, { FC, useCallback } from "react";
import { IActionApproverDto, IActionIdDto } from "services/backend/nswagts";

type Props = {
  currAction: IActionIdDto;
  submitCallback: (actionId: number, OwnerMetaDataForm: IActionApproverDto[]) => Promise<void>;
};
const AddActionApproverTriggerBtn: FC<Props> = ({ currAction, submitCallback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useCallback(async (OwnerMetaDataForm: IActionApproverDto[]) => {
    submitCallback(currAction.id, OwnerMetaDataForm);
  }, []);

  return (
    <>
      <PopoverMenuButton btnText={"Add approvers"} onClickMethod={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add approvers to: {currAction.title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ActionApproverForm submitCallback={handleSubmit} />
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
