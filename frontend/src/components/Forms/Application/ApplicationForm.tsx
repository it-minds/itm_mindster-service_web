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
  Wrap
} from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { ApplicationDto, ApplicationIdDto } from "services/backend/nswagts";

type Props = {
  submitCallback: (AppMetaDataForm: ApplicationDto) => void;
  AppMetaData?: ApplicationIdDto;
};

const ApplicationForm: FC<Props> = ({ submitCallback, AppMetaData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localFormData, setLocalFormData] = useState<ApplicationDto>(
    new ApplicationDto({
      title: "",
      description: ""
    })
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    if (AppMetaData) {
      setLocalFormData(AppMetaData);
    }
  }, [AppMetaData]);

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      onOpen();
    },
    [localFormData]
  );
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    onClose();
    await submitCallback(localFormData);
    setIsLoading(false);
  }, [localFormData]);

  const updateLocalForm = useCallback((value: unknown, key: keyof ApplicationDto) => {
    setLocalFormData(form => {
      (form[key] as unknown) = value;
      return new ApplicationDto(form);
    });
    console.log(localFormData);
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
                  value={localFormData.title}
                  placeholder="Title of your application"
                  onChange={event => updateLocalForm(event.target.value, "title")}></Input>
              </FormControl>
              <FormControl mt="6">
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Description of application"
                  value={localFormData.description}
                  onChange={event => updateLocalForm(event.target.value, "description")}
                />
              </FormControl>
              {isLoading ? (
                <Button variant="outline" width="full" mt={6}>
                  <Spinner></Spinner>
                </Button>
              ) : (
                <Button variant="outline" width="full" mt={6} type="submit">
                  Submit
                </Button>
              )}
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
                      <Input type="text" isReadOnly={true} value={localFormData.title}></Input>
                    </FormControl>
                    <FormControl mt="6">
                      <FormLabel>Description:</FormLabel>
                      <Textarea isReadOnly={true} value={localFormData.description} />
                    </FormControl>
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      No
                    </Button>
                    <Button onClick={() => handleSubmit()} type="submit" colorScheme="red" ml={3}>
                      Yes
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </form>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default ApplicationForm;
