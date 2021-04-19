import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Wrap
} from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IAppTokenCreateDto } from "services/backend/nswagts";

type Props = {
  submitCallback: (AppMetaDataForm: IAppTokenCreateDto) => Promise<void>;
  AppMetaData?: IAppTokenCreateDto;
};

const AppTokenForm: FC<Props> = ({ submitCallback, AppMetaData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localFormData, setLocalFormData] = useState<IAppTokenCreateDto>({});

  useEffect(() => {
    if (AppMetaData) {
      setLocalFormData(AppMetaData);
    }
  }, [AppMetaData]);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      setIsLoading(true);
      await submitCallback(localFormData);
      setIsLoading(false);
    },
    [localFormData]
  );

  const updateLocalForm = useCallback((value: unknown, key: keyof typeof localFormData) => {
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
            <form onSubmit={() => handleSubmit(event)}>
              <FormControl isRequired>
                <FormLabel>Identifier:</FormLabel>
                <Input
                  type="text"
                  placeholder="Token Identifier"
                  value={localFormData.tokenIdentifier}
                  onChange={event => updateLocalForm(event.target.value, "tokenIdentifier")}
                />
              </FormControl>
              <FormControl mt="6" isRequired>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Scope of the AppToken"
                  value={localFormData.description}
                  onChange={event => updateLocalForm(event.target.value, "description")}
                />
              </FormControl>
              <Button
                isLoading={isLoading}
                bgColor="blue.200"
                variant="outline"
                width="full"
                type="submit"
                mt={6}>
                Submit
              </Button>
            </form>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default AppTokenForm;
