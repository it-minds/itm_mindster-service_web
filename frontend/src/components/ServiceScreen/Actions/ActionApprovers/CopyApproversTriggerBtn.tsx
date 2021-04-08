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
import React, { FC } from "react";
import { IActionIdDto } from "services/backend/nswagts";

type Props = {
  currAction: IActionIdDto;
};
const CopyApproverTriggerBtn: FC<Props> = ({ currAction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PopoverMenuButton btnText={"Copy approvers to another action"} onClickMethod={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add approvers to: {currAction.title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody></ModalBody>
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

export default CopyApproverTriggerBtn;
