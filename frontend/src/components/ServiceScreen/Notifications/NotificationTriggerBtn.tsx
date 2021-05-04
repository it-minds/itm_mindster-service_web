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
import NotificationBellWithCounter from "components/Common/NotificationBellWithCounter";
import PendingList from "components/PendingApprovals/PendingList";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useContext } from "react";
const NotificationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pendingTokens, fetchPendingTokens } = useContext(ServiceViewContext);

  return (
    <>
      <NotificationBellWithCounter counter={pendingTokens.length} submitOnClick={onOpen} />
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
