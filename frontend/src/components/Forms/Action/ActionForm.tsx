import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
  Wrap
} from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { ActionDto, CreateActionCommand } from "services/backend/nswagts";

interface fromProps {
  serviceId: number;
  fetchData: () => Promise<void>;
}

const ActionForm: FC<fromProps> = ({ serviceId, fetchData }) => {
  const [localActionDataForm, setLocalActionDataForm] = useState<ActionDto>(
    new ActionDto({
      title: "",
      description: "",
      adminNote: ""
    })
  );

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async event => {
      setIsLoading(true);
      event.preventDefault();
      addAction();
    },
    [localActionDataForm]
  );

  const addAction = useCallback(async () => {
    const serviceClient = await genServiceClient();
    try {
      await serviceClient.createAction(
        serviceId,
        new CreateActionCommand({
          action: {
            title: localActionDataForm.title,
            description: localActionDataForm.description,
            adminNote: localActionDataForm.adminNote
          }
        })
      );
      toast({
        description: "Action was added",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `PostAction responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }

    fetchData();

    setIsLoading(false);
  }, [localActionDataForm]);

  const updateLocalForm = useCallback((value: unknown, key: keyof ActionDto) => {
    setLocalActionDataForm(form => {
      (form[key] as unknown) = value;
      return new ActionDto(form);
    });
  }, []);

  return (
    <Center>
      <Wrap width="full" justify="center">
        <Flex width="full" align="center" justifyContent="center">
          <Box width="full" p={6}>
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>Title:</FormLabel>
                <Input
                  value={localActionDataForm.title}
                  placeholder="Title of your action"
                  onChange={event => updateLocalForm(event.target.value, "title")}></Input>
              </FormControl>
              <FormControl mt="6">
                <FormLabel>Description: </FormLabel>
                <Textarea
                  placeholder="Description of action"
                  value={localActionDataForm.description}
                  onChange={event => updateLocalForm(event.target.value, "description")}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Admin note: </FormLabel>
                <Input
                  value={localActionDataForm.adminNote}
                  placeholder="admin note"
                  onChange={event => updateLocalForm(event.target.value, "adminNote")}></Input>
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
export default ActionForm;
