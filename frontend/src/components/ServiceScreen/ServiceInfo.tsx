import { Box, Center, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import MarkdownViewer from "components/Markdown/MarkdownViewer";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { IServiceIdDto, ServiceIdDto } from "services/backend/nswagts";

import ActionTable from "./Actions/ActionTable";
import CreateActionTriggerBtn from "./Actions/CreateActionTriggerBtn";
import AddServiceOwnersTriggerBtn from "./Owners/AddServiceOwnerTriggerBtn";
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

  if (!currService) return null;

  return (
    <Center>
      <Container pt="100px" pb="20px" w="6xl" maxW="unset">
        <Flex direction="column" h="full" width="full" align="left">
          <Flex w="full">
            <AddServiceOwnersTriggerBtn />
            <Spacer />
            <CreateActionTriggerBtn />
          </Flex>
          <ServiceOwnerOverview />
          <Box pt="10" width={0.65}>
            <Heading>{localFormData.title}</Heading>
            <MarkdownViewer value={localFormData.description} />
          </Box>
          <Box pt="10" width="full">
            <ActionTable />
          </Box>
        </Flex>
      </Container>
    </Center>
  );
};
export default ServiceInfo;
