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
import ActionForm from "components/Forms/Action/ActionForm";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useCallback, useContext } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { ActionDto, CreateActionCommand } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

const CreateActionTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currService, fetchUpdatedService } = useContext(ServiceViewContext);
  const toast = useToast();

  const createAction = useCallback(
    async (metaData: ActionDto) => {
      const client = await genServiceClient();
      try {
        await client.createAction(
          currService.id,
          new CreateActionCommand({
            action: new ActionDto({
              title: metaData.title,
              description: metaData.description,
              adminNote: metaData.adminNote,
              actionIdentifier: convertToIdentifier(metaData.title)
            })
          })
        );

        toast({
          description: "Action was created",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } catch (error) {
        toast({
          description: `CreateAction responded: ${error}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      } finally {
        fetchUpdatedService();
      }
    },
    [currService, fetchUpdatedService]
  );

  if (currService == null) return null;
  return (
    <>
      <Button onClick={onOpen} rightIcon={<BsPlus />} colorScheme="green">
        Create new action
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Action</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ActionForm submitCallback={createAction} />
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
export default CreateActionTriggerBtn;
