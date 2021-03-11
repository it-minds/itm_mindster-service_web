import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
  Wrap
} from "@chakra-ui/react";
import React, { FC, useCallback, useRef, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { CreateServiceCommand } from "services/backend/nswagts";

interface formProps {
  fetchData: () => Promise<void>;
}

const ServiceForm: FC<formProps> = ({ fetchData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const toast = useToast();

  const addService = useCallback(async () => {
    setIsLoading(true);
    const serviceClient = await genServiceClient();
    try {
      await serviceClient.createService(
        new CreateServiceCommand({
          service: {
            title: title,
            description: description,
            state: 0
          }
        })
      );
      toast({
        description: "Service was added",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      await fetchData();
      onClose();
    } catch (error) {
      toast({
        description: `PostService responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
    setIsLoading(false);
  }, [title, description]);

  const onSubmit = useCallback(event => {
    event.preventDefault();
    onOpen();
  }, []);

  return (
    <Center>
      <Wrap width="full" justify="center">
        <Flex width="full" align="center" justifyContent="center">
          <Box width="full" p={6}>
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Title:</FormLabel>
                <Input
                  type="text"
                  value={title}
                  placeholder="Title of your service"
                  onChange={event => setTitle(event.target.value)}></Input>
              </FormControl>
              <FormControl mt="6">
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Description of service"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                />
              </FormControl>
              {isLoading ? (
                <Button variant="outline" width="full" mt={6}>
                  <Spinner></Spinner>
                </Button>
              ) : (
                <>
                  <Button variant="outline" width="full" mt={6} type="submit">
                    Submit
                  </Button>
                  <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered>
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                      <AlertDialogHeader>Confirm submission</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                        Are you sure you want submit this service?
                        <FormControl>
                          <FormLabel>Title:</FormLabel>
                          <Input type="text" isReadOnly={true} value={title}></Input>
                        </FormControl>
                        <FormControl mt="6">
                          <FormLabel>Description:</FormLabel>
                          <Textarea isReadOnly={true} value={description} />
                        </FormControl>
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          No
                        </Button>
                        <Button onClick={addService} type="submit" colorScheme="red" ml={3}>
                          Yes
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </form>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default ServiceForm;
