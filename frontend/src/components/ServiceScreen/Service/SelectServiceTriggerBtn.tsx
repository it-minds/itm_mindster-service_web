import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Modal,
  ModalBody,
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
  useDisclosure
} from "@chakra-ui/react";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { BsX } from "@react-icons/all-files/bs/BsX";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useContext } from "react";

import CreateServiceTriggerBtn from "./CreateServiceTriggerBtn";
import ServiceTable from "./ServiceTable";

const SelectServiceTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currService } = useContext(ServiceViewContext);

  return (
    <>
      <Button borderWidth="1px" borderColor="black" bgColor="white" onClick={onOpen}>
        <Box mr="7px">{currService != null ? `${currService.title}` : "Select Service"}</Box>
        <BsChevronDown />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <Flex align="center" justify="center">
            <ModalHeader minWidth="max-content">Select Project</ModalHeader>
            <Spacer></Spacer>
            <Box>
              <CreateServiceTriggerBtn />
            </Box>
            <Box>
              <IconButton
                marginLeft="10px"
                size="lg"
                bgColor="transparent"
                aria-label="Close"
                icon={<BsX />}></IconButton>
            </Box>
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
