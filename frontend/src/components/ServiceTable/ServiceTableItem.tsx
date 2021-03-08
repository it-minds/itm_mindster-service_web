import { HamburgerIcon } from "@chakra-ui/icons";
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
  Tag,
  TagLabel,
  Td,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import ActionForm from "components/Forms/Action/ActionForm";
import { useColors } from "hooks/useColors";
import React, { FC, useState } from "react";
import { ServiceIdDto, ServiceStates } from "services/backend/nswagts";

import ActionTable from "./ActionTable/ActionTable";
interface ServiceTableItemProps {
  service: ServiceIdDto;
  fetchData: () => Promise<void>;
}
const ServiceTableItem: FC<ServiceTableItemProps> = ({ service, fetchData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formOpen, setFormOpen] = useState(false);
  const { hoverBg } = useColors();
  const stateColors = ["yellow", "green", "red"];

  return (
    <Tr
      key={service.id}
      _hover={{
        bgColor: hoverBg
      }}>
      <Td>{service.id}</Td>
      <Td>{service.title}</Td>
      <Td>{service.description}</Td>
      <Td>
        <Tag size="md" variant="subtle" colorScheme={stateColors[service.state]}>
          <TagLabel>{ServiceStates[service.state]}</TagLabel>
        </Tag>
      </Td>
      <Td>
        <Menu size="full">
          <MenuButton size="sm" as={IconButton} icon={<HamburgerIcon></HamburgerIcon>}></MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>View Actions</MenuItem>
            <MenuItem onClick={() => setFormOpen(!formOpen)}>Add action</MenuItem>
          </MenuList>
        </Menu>
      </Td>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actions of Service {service.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ActionTable tableData={service.actions}></ActionTable>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        scrollBehavior="inside"
        size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new action to service: {service.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ActionForm fetchData={fetchData} serviceId={service.id}></ActionForm>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setFormOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Tr>
  );
};
export default ServiceTableItem;
