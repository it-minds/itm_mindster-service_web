import { Box, FormControl, FormLabel, Input, Textarea, VStack } from "@chakra-ui/react";
import MarkdownTwoInOne from "components/Markdown/MarkdownTwoInOne";
import MarkdownViewer from "components/Markdown/MarkdownViewer";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { IServiceIdDto, ServiceIdDto } from "services/backend/nswagts";

import ActionTable from "./Actions/ActionTable";
import CreateActionTriggerBtn from "./Actions/CreateActionTriggerBtn";
import ServiceOwnerOverview from "./Owners/ServiceOwnerOverview";

const ServiceInfo: FC = () => {
  const { currService } = useContext(ServiceViewContext);
  const [localFormData, setLocalFormData] = useState<IServiceIdDto>(
    new ServiceIdDto({
      title: "",
      description: ""
    })
  );
  const [value, setValue] = useState(localFormData.description);

  useEffect(() => {
    if (currService) {
      setLocalFormData(currService);
      setValue(currService.description);
    }
  }, [currService]);

  return (
    <Box padding="100" width="full">
      <VStack pl="50" width="full" align="left">
        <Box width={0.65}>
          <MarkdownViewer value={localFormData.description} />

          {/* <form>
            <FormControl>
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                value={localFormData.title}
                isReadOnly={true}
                placeholder="Title of your service"></Input>
            </FormControl>
            <FormControl mt="6">
              <FormLabel>Description:</FormLabel>
              <Textarea
                height="200px"
                placeholder="Description of service"
                isReadOnly={true}
                value={localFormData.description}
              />
            </FormControl>
          </form> */}
        </Box>
        <Box pt="10" width="full">
          <ActionTable />
        </Box>
        <Box pt="10" width="full">
          <CreateActionTriggerBtn />
        </Box>
        <Box pt="10" width="full">
          <ServiceOwnerOverview />
        </Box>
      </VStack>
    </Box>
  );
};
export default ServiceInfo;
