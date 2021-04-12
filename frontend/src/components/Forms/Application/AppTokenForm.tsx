import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
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
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Scope of the AppToken"
                  value={localFormData.description}
                  onChange={event => updateLocalForm(event.target.value, "description")}
                />
              </FormControl>
              {isLoading ? (
                <Button bgColor="blue.200" variant="outline" width="full" mt={6}>
                  <Spinner></Spinner>
                </Button>
              ) : (
                <Button bgColor="blue.200" variant="outline" width="full" mt={6} type="submit">
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
export default AppTokenForm;
