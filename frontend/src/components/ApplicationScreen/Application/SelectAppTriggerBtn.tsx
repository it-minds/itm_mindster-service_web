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
  Tag,
  useDisclosure
} from "@chakra-ui/react";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { BsX } from "@react-icons/all-files/bs/BsX";
import { ViewContext } from "contexts/ViewContext";
import React, { FC, useContext } from "react";

import AppTable from "./AppTable";
import CreateApplicationTriggerBtn from "./CreateApplicationTriggerBtn";

const SelectAppTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication } = useContext(ViewContext);

  return (
    <>
      <Button borderWidth="1px" borderColor="black" bgColor="white" onClick={onOpen}>
        <Box mr="7px">
          {currApplication != null ? `${currApplication.title}` : "Select Application"}
        </Box>
        <BsChevronDown />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <Flex align="center" justify="center">
            <ModalHeader minWidth="max-content">Select Project</ModalHeader>
            <Spacer></Spacer>
            <Box>
              <CreateApplicationTriggerBtn />
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
                  <Box>
                    Starred
                    <Tag>Preview</Tag>
                  </Box>
                </Tab>
                <Tab>All</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <AppTable></AppTable>
                </TabPanel>
                <TabPanel>
                  <p>Starred!</p>
                </TabPanel>
                <TabPanel>
                  <AppTable></AppTable>
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

export default SelectAppTriggerBtn;
