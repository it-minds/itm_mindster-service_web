import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import React, { FC } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import TokenActionList from "./TokenActionsList";

type Props = {
  token: AppTokenIdDto;
};

const ViewTActionTriggerBtn: FC<Props> = ({ token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" variant="ghost" onClick={onOpen}>
        View Action
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actions of Token: {token.id}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody m="5">
            <TokenActionList actions={token.appTokenActions}></TokenActionList>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button width={0.15} colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewTActionTriggerBtn;
