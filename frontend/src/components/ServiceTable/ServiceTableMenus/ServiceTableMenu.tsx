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
import React, { FC } from "react";

import ServiceForm from "../../Forms/Service/ServiceForm";
import AddActionTriggerBtn from "./ServiceItemMenu/AddActionTriggerBtn";

const ServiceTableMenu: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Menu size="full">
        <MenuButton size="sm" as={IconButton} icon={<BsThreeDots />}></MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Add new service</MenuItem>
          <AddActionTriggerBtn serviceId={1}></AddActionTriggerBtn>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ServiceForm></ServiceForm>
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
export default ServiceTableMenu;
