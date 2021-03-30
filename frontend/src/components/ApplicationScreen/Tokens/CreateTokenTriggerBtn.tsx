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
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import AppTokenForm from "components/Forms/Application/AppTokenForm";
import { ViewContext } from "contexts/ViewContext";
import React, { FC, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { CreateAppTokenCommand } from "services/backend/nswagts";

const CreateTokenTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchAppTokens, currApplication } = useContext(ViewContext);
  const toast = useToast();

  const createAppToken = useCallback(
    async metaData => {
      const client = await genApplicationClient();
      try {
        await client.createAppToken(
          currApplication.id,
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
      fetchAppTokens();
    },
    [currApplication, fetchAppTokens]
  );

  if (currApplication == null) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<BsPlus />}
        borderWidth="1px"
        borderColor="black"
        bgColor="#4CAF50">
        Create new token
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add AppToken</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <AppTokenForm submitCallback={createAppToken}></AppTokenForm>
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
export default CreateTokenTriggerBtn;
