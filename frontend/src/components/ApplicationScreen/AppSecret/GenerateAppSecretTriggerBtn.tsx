import {
  Box,
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
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext } from "react";

import AppSecretResult from "./AppSecretResult";

const GenerateAppSecretTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication, fetchApps } = useContext(AppViewContext);

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Generate AppSecret
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you a ready to generate your Applications AppSecret?
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Box>
              <AppSecretResult
                currAppId={currApplication.id}
                submitCallback={() => {
                  onClose();
                  fetchApps();
                }}
              />
            </Box>
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

export default GenerateAppSecretTriggerBtn;
