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
  Wrap
} from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";
import { IActionDto } from "services/backend/nswagts";

type Props = {
  submitCallback: (AppMetaDataForm: IActionDto) => Promise<void>;
};

const ActionForm: FC<Props> = ({ submitCallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localFormData, setLocalFormData] = useState<IActionDto>({
    title: null,
    description: null,
    adminNote: null
  });

  const onSubmit = useCallback(
    async event => {
      setIsLoading(true);
      event.preventDefault();
      await submitCallback(localFormData);
      setIsLoading(false);
    },
    [localFormData]
  );

  const updateLocalForm = useCallback((value: unknown, key: keyof IActionDto) => {
    setLocalFormData(form => {
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
              <FormControl>
                <FormLabel>Title:</FormLabel>
                <Input
                  value={localFormData.title}
                  placeholder="Title of your action"
                  onChange={event => updateLocalForm(event.target.value, "title")}></Input>
              </FormControl>
              <FormControl mt="6">
                <FormLabel>Description: </FormLabel>
                <Textarea
                  placeholder="Description of action"
                  value={localFormData.description}
                  onChange={event => updateLocalForm(event.target.value, "description")}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Admin note: </FormLabel>
                <Input
                  value={localFormData.adminNote}
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
