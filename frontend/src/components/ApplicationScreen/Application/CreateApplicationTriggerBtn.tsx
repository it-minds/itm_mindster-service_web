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
import ApplicationForm from "components/Forms/Application/ApplicationForm";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationDto, CreateApplicationCommand } from "services/backend/nswagts";

const CreateApplicationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setNewCurrApp } = useContext(AppViewContext);
  const toast = useToast();

  const addApplication = useCallback(async (form: ApplicationDto) => {
    const applicationClient = await genApplicationClient();
    try {
      const appResult = await applicationClient.createApplication(
        new CreateApplicationCommand({
          application: form
        })
      );
      setNewCurrApp(appResult.appId);
      toast({
        description: `App created appSecret: ${appResult.appSecret}`,
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
  }, []);

  return (
    <>
      <Button
        rightIcon={<BsPlus />}
        borderWidth="1px"
        borderColor="black"
        bgColor="green"
        onClick={onOpen}>
        Create new project
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new application</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ApplicationForm submitCallback={addApplication}></ApplicationForm>
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

export default CreateApplicationTriggerBtn;
