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
const ServiceTableItem: FC<ServiceTableItemProps> = props => {
  const Service = props.service;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hoverBg } = useColors();

  const stateColors = ["yellow", "green", "red"];

  return (
    <Tr
      key={Service.id}
      onClick={onOpen}
      cursor="pointer"
      _hover={{
        bgColor: hoverBg
      }}>
      <Td>{Service.id}</Td>
      <Td>{Service.title}</Td>
      <Td>{Service.description}</Td>
      <Td>
        <Tag size="md" variant="subtle" colorScheme={stateColors[Service.state]}>
          <TagLabel>{ServiceStates[Service.state]}</TagLabel>
        </Tag>
      </Td>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actions of Service {Service.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ActionTable tableData={Service.actions}></ActionTable>
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
