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
import React, { FC, useCallback, useEffect, useState } from "react";
import { ActionDto, IActionDto } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

type Props = {
  submitCallback: (AppMetaDataForm: IActionDto) => Promise<void>;
};

const ActionForm: FC<Props> = ({ submitCallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [identifier, setIdentifier] = useState("");

  const onSubmit = useCallback(
    async event => {
      setIsLoading(true);
      event.preventDefault();
      await submitCallback(
        new ActionDto({
          title: title,
          description: description,
          adminNote: adminNote,
          actionIdentifier: title
        })
      );
      setIsLoading(false);
    },
    [title, description, adminNote, identifier]
  );

  useEffect(() => {
    if (title) {
      const timeOutId = setTimeout(() => setIdentifier(convertToIdentifier(title)), 700);
      return () => clearTimeout(timeOutId);
    }
  }, [title]);

  return (
    <Center>
      <Wrap width="full" justify="center">
        <Flex width="full" align="center" justifyContent="center">
          <Box width="full" p={6}>
            <Heading size="h3">ID: </Heading>
            {identifier}
            <form onSubmit={onSubmit}>
              <FormControl mt="6" isRequired>
                <FormLabel>Title:</FormLabel>
                <Input
                  type="text"
                  value={title}
                  placeholder="Title of your action"
                  onChange={event => {
                    setTitle(event.target.value);
                  }}></Input>
              </FormControl>
              <FormControl mt="6">
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Description of action"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                />
              </FormControl>
              <FormControl mt="6">
                <FormLabel>Admin note:</FormLabel>
                <Input
                  value={adminNote}
                  placeholder="admin note"
                  onChange={event => setAdminNote(event.target.value)}
                />
              </FormControl>
              <Center>
                <Button isLoading={isLoading} colorScheme="blue" mt={6} type="submit">
                  Submit
                </Button>
              </Center>
            </form>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default ActionForm;
