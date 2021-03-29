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
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import ApplicationForm from "components/Forms/Application/ApplicationForm";
import { ViewContext } from "contexts/ViewContext";
import React, { FC, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationDto, CreateApplicationCommand } from "services/backend/nswagts";

const CreateApplicationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchApps, setCurrApp } = useContext(ViewContext);
  const toast = useToast();

  const addApplication = useCallback(async (form: ApplicationDto) => {
    const applicationClient = await genApplicationClient();
    try {
      await applicationClient.createApplication(
        new CreateApplicationCommand({
          application: form
        })
      );
      setCurrApp(form);
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
      <Button rightIcon={<BsPlus />} borderColor="black" bgColor="green.400" onClick={onOpen}>
        Create new project
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

export default CreateApplicationTriggerBtn;
