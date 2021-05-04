import {
  Box,
  Button,
  Center,
  Circle,
  Divider,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { BsFillBellFill } from "@react-icons/all-files/Bs/BsFillBellFill";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useContext } from "react";

const NotificationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currService } = useContext(ServiceViewContext);

  if (!currService) return null;

  return (
    <>
      <Flex w="22px" mx="4px" mb="13px" justify="right" direction="column">
        <Flex>
          <Spacer />
          <Circle bgColor="red" size="12px">
            <Text fontSize="x-small">9</Text>
          </Circle>
        </Flex>
        <Icon onClick={onOpen} cursor="pointer" _hover={{ bg: "gray.500" }} as={BsFillBellFill} />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new application</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody></ModalBody>
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
export default NotificationTriggerBtn;
