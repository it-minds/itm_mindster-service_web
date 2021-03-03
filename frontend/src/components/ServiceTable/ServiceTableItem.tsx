import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  propNames,
  Tbody,
  Td,
  Tr,
  useDisclosure,
  Wrap
} from "@chakra-ui/react";
import Demo from "components/Demo/Demo";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IServiceIdDto, ServiceIdDto, ServiceStates } from "services/backend/nswagts";

import ActionTable from "./ActionTable/ActionTable";
interface ServiceTableItemProps {
  service: ServiceIdDto;
}
const ServiceTableItem: FC<ServiceTableItemProps> = props => {
  const Service = props.service;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr key={Service.id} onClick={onOpen}>
      <Td>{Service.id}</Td>
      <Td>{Service.title}</Td>
      <Td>{Service.description}</Td>
      <Td>{ServiceStates[Service.state]}</Td>

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
/**
<Accordion allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Td>Actions</Td>
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <ActionTable tableData={Service.actions}></ActionTable>
    </AccordionPanel>
  </AccordionItem>
</Accordion>;
 */
