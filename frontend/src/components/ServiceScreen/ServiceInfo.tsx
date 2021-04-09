import { Box, VStack } from "@chakra-ui/react";
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

  useEffect(() => {
    if (currService) {
      setLocalFormData(currService);
    }
  }, [currService]);

  return (
    <Box padding="100" width="full">
      <VStack pl="50" width="full" align="left">
        <Box width={0.65}>
          <MarkdownViewer value={localFormData.description} />
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
