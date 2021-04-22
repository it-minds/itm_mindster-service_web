import { Box, Center, Container, Flex, Heading, Spacer, VStack } from "@chakra-ui/react";
import MarkdownViewer from "components/Markdown/MarkdownViewer";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { ApplicationDto, IApplicationDto } from "services/backend/nswagts";

import AddOwnersTriggerBtn from "./Owners/AddOwnersTriggerBtn";
import AppOwnerOverview from "./Owners/AppOwnerOverview";
import CreateTokenTriggerBtn from "./Tokens/CreateTokenTriggerBtn";
import TokenTable from "./Tokens/TokenTable";

const ApplicationInfo: FC = () => {
  const { currApplication } = useContext(AppViewContext);
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

  if (!currApplication) return null;

  return (
    <Center>
      <Container pb="15px" w="6xl" maxW="unset">
        <VStack width="full" align="left">
          <Flex w="full">
            <AddOwnersTriggerBtn />
            <Spacer />
            <CreateTokenTriggerBtn />
          </Flex>
          <AppOwnerOverview />
          <Box pt="10" width={0.65}>
            <Heading>{localFormData.title}</Heading>
            <MarkdownViewer value={localFormData.description} />
          </Box>
          <Box pt="10" width="full">
            <TokenTable />
          </Box>
        </VStack>
      </Container>
    </Center>
  );
};
export default ApplicationInfo;
