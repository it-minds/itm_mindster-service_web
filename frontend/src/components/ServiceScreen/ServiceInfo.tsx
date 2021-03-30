import { Box, FormControl, FormLabel, Input, Textarea, VStack } from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { IServiceIdDto, ServiceIdDto } from "services/backend/nswagts";

const ServiceInfo: FC = () => {
  const { currService } = useContext(ServiceViewContext);
  const [localFormData, setLocalFormData] = useState<IServiceIdDto>(
    new ServiceIdDto({
      title: "",
      description: ""
    })
  );

  useEffect(() => {
    if (currService) {
      setLocalFormData(currService);
    }
  }, [currService]);

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
                height="200px"
                placeholder="Description of application"
                isReadOnly={true}
                value={localFormData.description}
              />
            </FormControl>
          </form>
        </Box>
        {/* <Box pt="10" width="full">
          <TokenTable></TokenTable>
        </Box>
        <Box pt="10" width="full">
          <CreateTokenTriggerBtn></CreateTokenTriggerBtn>
        </Box>
        <Box pt="10" width="full">
          <OwnerOverview></OwnerOverview>
        </Box> */}
      </VStack>
    </Box>
  );
};
export default ServiceInfo;
