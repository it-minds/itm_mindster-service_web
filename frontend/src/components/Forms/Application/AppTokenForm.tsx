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
import { AppTokenCreateDto, IAppTokenCreateDto } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

type Props = {
  submitCallback: (AppMetaDataForm: IAppTokenCreateDto) => Promise<void>;
};

const AppTokenForm: FC<Props> = ({ submitCallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      setIsLoading(true);
      await submitCallback(
        new AppTokenCreateDto({ tokenIdentifier: description, description: description })
      );
      setIsLoading(false);
    },
    [description, identifier]
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
            <form onSubmit={() => handleSubmit(event)}>
              <FormControl mt="6" isRequired>
                <FormLabel>Identifier:</FormLabel>
                <Input
                  type="text"
                  placeholder="Token Identifier"
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                />
              </FormControl>
              <FormControl mt="6" isRequired>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Scope of the AppToken"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                />
              </FormControl>
              <Center>
                <Button isLoading={isLoading} colorScheme="blue" type="submit" mt={6}>
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
export default AppTokenForm;
