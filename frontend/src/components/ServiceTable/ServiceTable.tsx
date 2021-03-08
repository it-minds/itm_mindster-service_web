import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Heading,
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
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Wrap
} from "@chakra-ui/react";
import ServiceForm from "components/Forms/Service/ServiceForm";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useEffect, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { ServiceIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import ServiceTableItem from "./ServiceTableItem";

const ServiceTable: FC = () => {
  const [tableData, setData] = useState<ServiceIdDto[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useLocales();

  const fetchData = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getAllServices();

      if (data && data.length > 0) setData(data);
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Center>
      <Wrap width="700px" justify="center">
        <Heading>{t("example.title")}</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>State</Th>
              <Th>
                <Menu size="full">
                  <MenuButton
                    size="sm"
                    as={IconButton}
                    icon={<HamburgerIcon></HamburgerIcon>}></MenuButton>
                  <MenuList>
                    <MenuItem onClick={onOpen}>Add new service</MenuItem>
                  </MenuList>
                </Menu>
              </Th>
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
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((Service: ServiceIdDto) => (
              <ServiceTableItem key={Service.id} service={Service}></ServiceTableItem>
            ))}
          </Tbody>
        </Table>
      </Wrap>
    </Center>
  );
};

export default ServiceTable;
