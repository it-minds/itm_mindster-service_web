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
import { IServiceDto, ServiceDto } from "services/backend/nswagts";
type Props = {
  submitCallback: (service: IServiceDto) => Promise<void>;
  serviceMetaData?: IServiceDto;
};
const ServiceForm: FC<Props> = ({ submitCallback, serviceMetaData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState<IServiceDto>(
    new ServiceDto({
      title: null,
      description: null
    })
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (serviceMetaData) {
      setService(serviceMetaData);
    }
  }, [serviceMetaData]);

  const submitService = useCallback(async () => {
    onClose();
    setIsLoading(true);
    await submitCallback(service);
    setIsLoading(false);
  }, [service]);

  const onSubmit = useCallback(event => {
    event.preventDefault();
    onOpen();
  }, []);

  const updateLocalService = useCallback((value: unknown, key: keyof IServiceDto) => {
    setService(form => {
      (form[key] as unknown) = value;
      return form;
    });
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
                  value={service.title}
                  placeholder="Title of your service"
                  onChange={event => updateLocalService(event.target.value, "title")}></Input>
              </FormControl>
              <FormControl mt="6">
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Description of service"
                  value={service.description}
                  onChange={event => updateLocalService(event.target.value, "description")}
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
                          <Input type="text" isReadOnly={true} value={service.title}></Input>
                        </FormControl>
                        <FormControl mt="6">
                          <FormLabel>Description:</FormLabel>
                          <Textarea isReadOnly={true} value={service.description} />
                        </FormControl>
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          No
                        </Button>
                        <Button onClick={submitService} type="submit" colorScheme="red" ml={3}>
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
