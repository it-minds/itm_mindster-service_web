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
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import { CreateApplicationCommand, CreateServiceCommand } from "services/backend/nswagts";

type Props = {
  fetchData: () => Promise<void>;
};

const ApplicationForm: FC<Props> = ({ fetchData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      onOpen();
    },
    [title, description]
  );

  const addApplication = useCallback(async () => {
    setIsLoading(true);
    onClose();

    const applicationClient = await genApplicationClient();
    try {
      await applicationClient.createApplication(
        new CreateApplicationCommand({
          application: {
            title: title,
            description: description
          }
        })
      );
      toast({
        description: "Application was added",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `PostApplication responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }

    setIsLoading(false);
    fetchData();
  }, [title, description]);

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
                  placeholder="Title of your application"
                  onChange={event => setTitle(event.target.value)}></Input>
              </FormControl>
              <FormControl mt="6">
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Description of application"
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
                        Are you sure you want submit this application?
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
                        <Button onClick={addApplication} type="submit" colorScheme="red" ml={3}>
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
export default ApplicationForm;
