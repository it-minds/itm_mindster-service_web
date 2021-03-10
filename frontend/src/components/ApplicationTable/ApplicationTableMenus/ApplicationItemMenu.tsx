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
import { ApplicationIdDto, UpdateApplicationCommand } from "services/backend/nswagts";

type Props = {
  fetchData: () => Promise<void>;
  application: ApplicationIdDto;
};

const ApplicationItemMenu: FC<Props> = ({ fetchData, application }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const updateApplication = useCallback(async metaData => {
    const applicationClient = await genApplicationClient();
    try {
      await applicationClient.updateApplication(
        metaData.id,
        new UpdateApplicationCommand({
          application: metaData
        })
      );
      toast({
        description: "Application was updated",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `PutApplication responded: ${error}`,
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
          <MenuItem onClick={onOpen}>update application</MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update application</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ApplicationForm
              AppMetaData={application}
              submitCallback={updateApplication}></ApplicationForm>
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
export default ApplicationItemMenu;
