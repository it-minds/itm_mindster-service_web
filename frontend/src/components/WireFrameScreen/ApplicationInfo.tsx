import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { ViewContext } from "contexts/ViewContext";
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ApplicationDto, IApplicationDto } from "services/backend/nswagts";

import CreateTokenTriggerBtn from "./Tokens/CreateTokenTriggerBtn";
import TokenTable from "./Tokens/TokenTable";

const ApplicationInfo: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currApplication } = useContext(ViewContext);
  const [localFormData, setLocalFormData] = useState<IApplicationDto>(
    new ApplicationDto({
      title: "",
      description: ""
    })
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    if (currApplication) {
      setLocalFormData(currApplication);
    }
  }, [currApplication]);

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      onOpen();
    },
    [localFormData]
  );
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    onClose();
    setIsLoading(false);
  }, [localFormData]);

  const updateLocalForm = useCallback((value: unknown, key: keyof IApplicationDto) => {
    setLocalFormData(form => {
      (form[key] as unknown) = value;
      return new ApplicationDto(form);
    });
    console.log(localFormData);
  }, []);

  return (
    <Box padding="100" width="full">
      <VStack pl="50" width="full" align="left">
        <Box width={0.65}>
          <form onSubmit={onSubmit}>
            <FormControl isRequired>
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                value={localFormData.title}
                isReadOnly={true}
                placeholder="Title of your application"
                onChange={event => updateLocalForm(event.target.value, "title")}></Input>
            </FormControl>
            <FormControl mt="6">
              <FormLabel>Description:</FormLabel>
              <Textarea
                placeholder="Description of application"
                isReadOnly={true}
                value={localFormData.description}
                onChange={event => updateLocalForm(event.target.value, "description")}
              />
            </FormControl>
          </form>
        </Box>
        <Box pt="10" width="full">
          <TokenTable></TokenTable>
        </Box>
        <Box pt="10" width="full">
          {currApplication != null ? (
            <CreateTokenTriggerBtn></CreateTokenTriggerBtn>
          ) : (
            <Text>Select an application to create a token</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};
export default ApplicationInfo;
