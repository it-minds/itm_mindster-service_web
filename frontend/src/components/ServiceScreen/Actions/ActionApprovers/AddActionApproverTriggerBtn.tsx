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
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import PopoverMenuButton from "components/Common/PopoverMenuButton";
import ActionApproverForm from "components/Forms/Service/ActionApproverForm";
import ServiceOwnerForm from "components/Forms/Service/ServiceOwnerForm";
import React, { FC, useCallback } from "react";
import { genServiceClient } from "services/backend/apiClients";
import {
  CreateActionApproverCommand,
  IActionApproverDto,
  IActionIdDto
} from "services/backend/nswagts";

type Props = {
  currAction: IActionIdDto;
  submitCallback: (OwnerMetaDataForm: IServiceOwnerDto[]) => Promise<void>;
};
const AddActionApproverTriggerBtn: FC<Props> = ({ currAction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addApprovers = useCallback(async (form: IActionApproverDto[]) => {
    const client = await genServiceClient();
    try {
      await client.addActionApprovers(
        currAction.id,
        new CreateActionApproverCommand({
          actionApprovers: form
        })
      );
      toast({
        description: "Approvers were added",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `PostApprovers responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  }, []);

  return (
    <>
      <PopoverMenuButton btnText={"Add owners"} onClickMethod={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add approvers to: {currAction.title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ActionApproverForm submitCallback={addApprovers} />
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
