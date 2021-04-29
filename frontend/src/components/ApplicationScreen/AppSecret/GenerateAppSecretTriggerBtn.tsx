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
import React, { FC, useContext, useState } from "react";

import AppSecretResult from "./AppSecretResult";

const GenerateAppSecretTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication, setNewCurrApp } = useContext(AppViewContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Generate AppSecret
      </Button>

      <Modal
        closeOnEsc={!isLoading}
        closeOnOverlayClick={!isLoading}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to generate your Applications AppSecret?</ModalHeader>
          <ModalCloseButton isDisabled={isLoading} />
          <Divider />
          <ModalBody>
            <Box>
              <AppSecretResult
                currAppId={currApplication.id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                submitCallback={() => {
                  onClose();
                  setNewCurrApp(currApplication.id);
                }}
              />
            </Box>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button isDisabled={isLoading} colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GenerateAppSecretTriggerBtn;
