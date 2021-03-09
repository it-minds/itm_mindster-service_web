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
import ActionForm from "components/Forms/Action/ActionForm";
import React, { FC } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import ViewActionTableTrigger from "./ViewActionTableTrigger";

type Props = {
  service: ServiceIdDto;
  fetchData: () => Promise<void>;
};

const ServiceItemMenu: FC<Props> = ({ service, fetchData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Menu size="full">
        <MenuButton size="sm" as={IconButton} icon={<BsThreeDots />}></MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Add action</MenuItem>
          <ViewActionTableTrigger service={service}></ViewActionTableTrigger>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new action to service: {service.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ActionForm fetchData={fetchData} serviceId={service.id}></ActionForm>
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
export default ServiceItemMenu;
