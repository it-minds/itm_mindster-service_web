import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Input,
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
import { CreateAuthAppTokenCommand, IService2, TokenInput } from "services/backend/nswagts";

type Props = {
  aid: string;
  submitCallback: () => void;
  services: IService2[];
};

const AuthTokenForm: FC<Props> = ({ aid, submitCallback, services }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [appSecret, setAppSecret] = useState("");
  const [JWT, setJWT] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(JWT);
  const toast = useToast();

  const CreateJWT = useCallback(async () => {
    const applicationClient = await genApplicationClient();
    try {
      const appResult = await applicationClient.createAuthAppToken(
        aid,
        new CreateAuthAppTokenCommand({
          tokenInput: new TokenInput({
            tokenIdentifier: "bla bla",
            services: services
          })
        }),
        appSecret
      );
      setJWT(appResult.jwt);
    } catch (error) {
      toast({
        description: `CreateJwt responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  }, [appSecret, aid]);

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      setIsLoading(true);
      await CreateJWT();
      setIsLoading(false);
      onOpen();
    },
    [appSecret]
  );
  return (
    <Center>
      <Box width="full" p={6}>
        <form onSubmit={onSubmit}>
          <FormControl isRequired>
            <FormLabel>App secret:</FormLabel>
            <Input
              type="text"
              value={appSecret}
              placeholder="You received this once when you created your application"
              onChange={event => setAppSecret(event.target.value)}></Input>
          </FormControl>
          <Button isLoading={isLoading} variant="outline" width="full" mt={6} type="submit">
            Submit
          </Button>
        </form>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          submitCallback();
        }}
        scrollBehavior="inside"
        size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Here is your JWT for: {aid}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Text>{JWT}</Text>
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
export default AuthTokenForm;
