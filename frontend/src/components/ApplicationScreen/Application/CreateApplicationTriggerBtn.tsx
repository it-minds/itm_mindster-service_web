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
import MarkdownTwoSplit from "components/Markdown/MarkdownTwoSplit";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useCallback, useContext, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationDto, CreateApplicationCommand } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

const CreateApplicationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setNewCurrApp } = useContext(AppViewContext);
  const [value, setValue] = useState("# My Application\n");
  const toast = useToast();

  const addApplication = useCallback(async (title: string, description: string) => {
    const applicationClient = await genApplicationClient();
    try {
      const appId = await applicationClient.createApplication(
        new CreateApplicationCommand({
          application: new ApplicationDto({
            title: title,
            description: description,
            appIdentifier: convertToIdentifier(title)
          })
        })
      );
      setNewCurrApp(appId);
      toast({
        description: `Application created`,
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
      <Button rightIcon={<BsPlus />} colorScheme="green" onClick={onOpen}>
        Create new project
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new application</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <MarkdownTwoSplit
              startTitle="my Application.md"
              value={value}
              onValueChange={setValue}
              onSave={addApplication}
            />
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
