import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import AppTokenForm from "components/Forms/Application/AppTokenForm";
import React, { FC, useCallback } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationIdDto, CreateAppTokenCommand } from "services/backend/nswagts";

type Props = {
  application: ApplicationIdDto;
};

const AddAppTokenTriggerBtn: FC<Props> = ({ application }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const createAppToken = useCallback(async metaData => {
    const client = await genApplicationClient();
    try {
      await client.createAppToken(
        application.id,
        new CreateAppTokenCommand({ appToken: metaData })
      );
      toast({
        description: "AppToken was created",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `CreateAppToken responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  }, []);

  return (
    <>
      <Button justifyContent="left" isFullWidth={true} size="sm" variant="ghost" onClick={onOpen}>
        Add new AppToken
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add AppToken</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AppTokenForm submitCallback={createAppToken}></AppTokenForm>
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
export default AddAppTokenTriggerBtn;
