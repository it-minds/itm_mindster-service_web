import {
  Button,
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
import ApplicationForm from "components/Forms/Application/ApplicationForm";
import { ApplicationContext } from "contexts/ApplicationContext";
import React, { FC, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationDto, CreateApplicationCommand } from "services/backend/nswagts";

const AddApplicationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchApps } = useContext(ApplicationContext);
  const toast = useToast();

  const addApplication = useCallback(async (form: ApplicationDto) => {
    const applicationClient = await genApplicationClient();
    try {
      await applicationClient.createApplication(
        new CreateApplicationCommand({
          application: form
        })
      );
      toast({
        description: "Application was added",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `PostApplication responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
    fetchApps();
  }, []);

  return (
    <>
      <Button justifyContent="left" isFullWidth={true} size="sm" variant="ghost" onClick={onOpen}>
        Add application
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new application</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ApplicationForm submitCallback={addApplication}></ApplicationForm>
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

export default AddApplicationTriggerBtn;
