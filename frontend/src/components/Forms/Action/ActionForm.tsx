import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Wrap
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import React, { FC, useCallback, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { CreateActionCommand } from "services/backend/nswagts";

interface fromProps {
  serviceId: number;
}

const ActionForm: FC<fromProps> = props => {
  const { t } = useLocales();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const id = props.serviceId;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    addAction();
  };

  const addAction = useCallback(async () => {
    const serviceClient = await genServiceClient();
    console.log(title);
    await serviceClient.createAction(
      id,
      new CreateActionCommand({
        action: {
          title: title,
          description: description,
          adminNote: adminNote
        }
      })
    );
  }, [title, description, adminNote]);

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
                  placeholder="Title of your action"
                  onChange={event => setTitle(event.target.value)}></Input>
              </FormControl>
              <FormControl mt="6">
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Description of action"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Admin note:</FormLabel>
                <Input
                  type="text"
                  value={adminNote}
                  placeholder="admin note"
                  onChange={event => setAdminNote(event.target.value)}></Input>
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
export default ActionForm;
