import {
  Button,
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
import { useColors } from "hooks/useColors";
import React, { FC } from "react";
import { ServiceIdDto, ServiceStates } from "services/backend/nswagts";

import ActionTable from "./ActionTable/ActionTable";
interface ServiceTableItemProps {
  service: ServiceIdDto;
}
const ServiceTableItem: FC<ServiceTableItemProps> = ({ service }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { menuBg, hoverBg, activeBg } = useColors();

  const stateColors = ["yellow", "green", "red"];

  return (
    <Tr
      key={service.id}
      onClick={onOpen}
      cursor="pointer"
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
    </Tr>
  );
};
export default ServiceTableItem;
