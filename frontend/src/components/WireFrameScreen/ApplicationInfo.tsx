import { Box, FormControl, FormLabel, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { ViewContext } from "contexts/ViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { ApplicationDto, IApplicationDto } from "services/backend/nswagts";

import CreateTokenTriggerBtn from "./Tokens/CreateTokenTriggerBtn";
import TokenTable from "./Tokens/TokenTable";

const ApplicationInfo: FC = () => {
  const { currApplication } = useContext(ViewContext);
  const [localFormData, setLocalFormData] = useState<IApplicationDto>(
    new ApplicationDto({
      title: "",
      description: ""
    })
  );

  useEffect(() => {
    if (currApplication) {
      setLocalFormData(currApplication);
    }
  }, [currApplication]);

  return (
    <Box padding="100" width="full">
      <VStack pl="50" width="full" align="left">
        <Box width={0.65}>
          <form>
            <FormControl>
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                value={localFormData.title}
                isReadOnly={true}
                placeholder="Title of your application"></Input>
            </FormControl>
            <FormControl mt="6">
              <FormLabel>Description:</FormLabel>
              <Textarea
                placeholder="Description of application"
                isReadOnly={true}
                value={localFormData.description}
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
