import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import ApplicationForm from "components/Forms/Application/ApplicationForm";
import React, { FC, useCallback } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import {
  ApplicationDto,
  ApplicationIdDto,
  CreateApplicationCommand
} from "services/backend/nswagts";

type Props = {
  fetchData: () => Promise<void>;
};

const ApplicationTableMenu: FC<Props> = ({ fetchData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    fetchData();
  }, []);

  return (
    <div>
      <Menu size="full">
        <MenuButton size="sm" as={IconButton} icon={<BsThreeDots />}></MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Add new application</MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new application</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ApplicationForm
              AppMetaData={new ApplicationIdDto({ title: "test", description: "monkey", id: 1 })}
              submitCallback={addApplication}></ApplicationForm>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default ApplicationTableMenu;
