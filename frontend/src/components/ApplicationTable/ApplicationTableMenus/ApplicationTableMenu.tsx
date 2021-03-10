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
  useDisclosure
} from "@chakra-ui/react";
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import ApplicationForm from "components/Forms/Application/ApplicationForm";
import React, { FC } from "react";

type Props = {
  fetchData: () => Promise<void>;
};

const ApplicationTableMenu: FC<Props> = ({ fetchData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <ApplicationForm fetchData={fetchData}></ApplicationForm>
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
