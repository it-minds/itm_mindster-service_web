import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
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
    <Box padding="75" width="full">
      <VStack pl="50" width="full" align="left">
        <Flex w="full">
          <AddOwnersTriggerBtn />
          <Spacer />
          <CreateTokenTriggerBtn />
        </Flex>
        <AppOwnerOverview />
        <Box pt="10" width={0.65}>
          {localFormData.title}
          <MarkdownViewer value={localFormData.description} />
        </Box>
        <Box pt="10" width="full">
          <TokenTable />
        </Box>
      </VStack>
    </Box>
  );
};
export default ApplicationInfo;
