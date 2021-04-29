import {
  Box,
  Button,
  Center,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { CreateAppSecretCommand } from "services/backend/nswagts";

type Props = {
  currAppId: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  submitCallback: () => void;
};

const AppSecretResult: FC<Props> = ({ submitCallback, currAppId, isLoading, setIsLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [appSecret, setAppSecret] = useState("");
  const { hasCopied, onCopy } = useClipboard(appSecret);
  const toast = useToast();

  const generateAppSecret = useCallback(async () => {
    setIsLoading(true);
    const applicationClient = await genApplicationClient();
    try {
      const authResult = await applicationClient.generateAppSecret(
        currAppId,
        new CreateAppSecretCommand({})
      );
      setAppSecret(authResult.appSecret);
      onOpen();
    } catch (error) {
      toast({
        description: `GenerateAppSecret responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Center>
      <Box width="full" p={6}>
        <Text>
          This can only be done once and you are responsible for keeping it safe and secure. The
          AppSecret is used for signing your AppTokens in order to generate a JWT.
        </Text>
        <Button
          isLoading={isLoading}
          onClick={() => generateAppSecret()}
          colorScheme="green"
          mt="10px">
          Generate AppSecret
        </Button>
      </Box>
      <Modal
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          submitCallback();
        }}
        scrollBehavior="inside"
        size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Here is your AppSecret</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Text>{appSecret}</Text>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" onClick={onCopy} mr={2}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onClose();
                submitCallback();
              }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};
export default AppSecretResult;
