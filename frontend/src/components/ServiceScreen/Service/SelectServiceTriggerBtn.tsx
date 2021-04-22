import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useContext } from "react";

import CreateServiceTriggerBtn from "./CreateServiceTriggerBtn";
import ServiceTable from "./ServiceTable";

const SelectServiceTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currService } = useContext(ServiceViewContext);

  return (
    <>
      <Button
        width={["150px", "150px", "max-content"]}
        rightIcon={<BsChevronDown />}
        colorScheme="gray"
        onClick={onOpen}>
        <Text isTruncated>{currService?.title ?? "Select Service"}</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <Flex align="center" justify="center">
            <ModalHeader minWidth="max-content">Select Project</ModalHeader>
            <Spacer></Spacer>
            <Box mr="20">
              <CreateServiceTriggerBtn />
            </Box>
            <ModalCloseButton />
          </Flex>

          <Divider />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Recent</Tab>
                <Tab>
                  <Box>Starred</Box>
                </Tab>
                <Tab>All</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ServiceTable />
                </TabPanel>
                <TabPanel>
                  <p>Starred!</p>
                </TabPanel>
                <TabPanel>
                  <ServiceTable />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectServiceTriggerBtn;
