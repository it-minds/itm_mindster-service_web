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
import { ViewContext } from "contexts/ViewContext";
import React, { FC, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationOwnerDto, CreateApplicationOwnerCommand } from "services/backend/nswagts";

import AppOwnerForm from "../../Forms/Application/AddAppOwnerForm";

const AddOwnersTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchAppOwners, currApplication } = useContext(ViewContext);
  const toast = useToast();

  const addOwners = useCallback(
    async (form: ApplicationOwnerDto[]) => {
      const applicationClient = await genApplicationClient();
      try {
        await applicationClient.addAppOwners(
          currApplication.id,
          new CreateApplicationOwnerCommand({
            appOwners: form
          })
        );
        toast({
          description: "Owners were added",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } catch (error) {
        toast({
          description: `PostAppOwners responded: ${error}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
      onClose();
      fetchAppOwners();
    },
    [currApplication, fetchAppOwners]
  );

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<BsPlus />}
        borderWidth="1px"
        borderColor="black"
        bgColor="#4CAF50">
        Add owners
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add owners to: {currApplication.title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <AppOwnerForm submitCallback={addOwners}></AppOwnerForm>
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

export default AddOwnersTriggerBtn;
