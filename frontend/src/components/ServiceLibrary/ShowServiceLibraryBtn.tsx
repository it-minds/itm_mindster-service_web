import {
  Button,
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

import ServiceLibrary from "./ServiceLibrary";

const ShowServiceLibraryBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button justifyContent="left" isFullWidth={true} size="sm" variant="ghost" onClick={onOpen}>
        Browse Services
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actions of service: </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ServiceLibrary></ServiceLibrary>
          </ModalBody>
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

export default ShowServiceLibraryBtn;
