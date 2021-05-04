import {
  Button,
  Circle,
  Divider,
  Flex,
  Icon,
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
import PendingList from "components/PendingApprovals/PendingList";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { SignalRContext } from "contexts/SignalRContext";
import React, { FC, useContext } from "react";
const NotificationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pendingTokens, fetchPendingTokens } = useContext(ServiceViewContext);

  return (
    <>
      <Flex w="22px" mx="4px" mb="13px" justify="right" direction="column">
        <Flex visibility={pendingTokens.length == 0 ? "hidden" : "visible"}>
          <Spacer />
          <Circle bgColor="red" size="12px">
            <Text fontSize="x-small">{pendingTokens.length > 9 ? "+9" : pendingTokens.length}</Text>
          </Circle>
        </Flex>
        <Icon onClick={onOpen} cursor="pointer" _hover={{ bg: "gray.500" }} as={BsFillBellFill} />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pending actions </ModalHeader>
          <Button onClick={() => fetchPendingTokens()}>Refresh</Button>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <PendingList />
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
export default NotificationTriggerBtn;
