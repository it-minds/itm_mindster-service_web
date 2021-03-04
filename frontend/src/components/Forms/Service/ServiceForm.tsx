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
  Textarea,
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

  const onSubmit = event => {
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
  }, [title, description]);

  return (
    <Center>
      <Wrap width="700px" justify="center">
        <Heading>Add new Service</Heading>
        <Flex width="full" align="center" justifyContent="center">
          <Box width="full" p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
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
              <Button variant="outline" width="full" mt={6} type="submit">
                Submit
              </Button>
            </form>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default ServiceForm;
