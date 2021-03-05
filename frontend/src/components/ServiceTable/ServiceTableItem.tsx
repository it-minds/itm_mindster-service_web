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
import CustomModal from "components/Common/CustomModal";
import ActionForm from "components/Forms/Action/ActionForm";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { isIP } from "net";
import Link from "next/link";
import React, { FC, useState } from "react";
import { ServiceIdDto, ServiceStates } from "services/backend/nswagts";

import ActionTable from "./ActionTable/ActionTable";
interface ServiceTableItemProps {
  service: ServiceIdDto;
}
const ServiceTableItem: FC<ServiceTableItemProps> = props => {
  const Service = props.service;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formOpen, setFormOpen] = useState(false);

  const { hoverBg } = useColors();
  const { t, locale, localeNameMap } = useLocales();

  const stateColors = ["yellow", "green", "red"];

  return (
    <Tr
      key={Service.id}
      //onClick={onOpen}
      //cursor="pointer"
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
      <Td>
        <Menu size="full">
          <MenuButton size="sm" as={IconButton} icon={<HamburgerIcon></HamburgerIcon>}></MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>View Actions</MenuItem>
            {/* <Link href={`${locale}/Service/${Service.id}`}>Add new action</Link> */}
            <MenuItem onClick={() => setFormOpen(!formOpen)}>Add action</MenuItem>
          </MenuList>
        </Menu>
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

      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        scrollBehavior="inside"
        size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actions of Service {Service.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ActionForm serviceId={Service.id}>xadfwa</ActionForm>
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
