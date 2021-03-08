import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
  Wrap
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { CreateServiceCommand } from "services/backend/nswagts";

const ServiceForm: FC = () => {
  const { t } = useLocales();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = (event: { preventDefault: () => void }) => {
    setIsLoading(true);
    event.preventDefault();
    addService();
  };

  const addService = useCallback(async () => {
    const serviceClient = await genServiceClient();
    console.log(title);
    console.log(description);
    await serviceClient.createService(
      new CreateServiceCommand({
        service: {
          title: title,
          description: description,
          state: 0
        }
      })
    );
    setIsLoading(false);
    toast({
      description: "Service was added",
      status: "success",
      duration: 5000,
      isClosable: true
    });
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
                <Button variant="outline" width="full" mt={6} type="submit">
                  Submit
                </Button>
              )}
            </form>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default ServiceForm;