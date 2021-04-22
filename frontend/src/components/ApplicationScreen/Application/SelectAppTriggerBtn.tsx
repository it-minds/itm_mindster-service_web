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
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext } from "react";

import AppTable from "./AppTable";
import CreateApplicationTriggerBtn from "./CreateApplicationTriggerBtn";

const SelectAppTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication } = useContext(AppViewContext);

  return (
    <>
      <Button
        width={["175px", "175px", "max-content"]}
        colorScheme="gray"
        rightIcon={<BsChevronDown />}
        onClick={onOpen}>
        <Text isTruncated>{currApplication?.title ?? "Select Application"}</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <Flex align="center" justify="center">
            <ModalHeader minWidth="max-content">Select Project</ModalHeader>
            <Spacer></Spacer>
            <Box mr="20">
              <CreateApplicationTriggerBtn />
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
