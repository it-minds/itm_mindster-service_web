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
import {
  ApplicationDto,
  ApplicationIdDto,
  AppTokenCreateDto,
  AppTokenDto
} from "services/backend/nswagts";

type Props = {
  submitCallback: (AppMetaDataForm: AppTokenCreateDto) => void;
  AppMetaData?: AppTokenCreateDto;
};

const AppTokenForm: FC<Props> = ({ submitCallback, AppMetaData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localFormData, setLocalFormData] = useState<AppTokenCreateDto>(
    new AppTokenCreateDto({ description: "" })
  );

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

  const updateLocalForm = useCallback((value: unknown, key: keyof AppTokenCreateDto) => {
    setLocalFormData(form => {
      (form[key] as unknown) = value;
      return new AppTokenCreateDto(form);
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
export default AppTokenForm;
