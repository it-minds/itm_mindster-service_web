import { Box, VStack } from "@chakra-ui/react";
import MarkdownViewer from "components/Markdown/MarkdownViewer";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { ApplicationDto, IApplicationDto } from "services/backend/nswagts";

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

  return (
    <Box padding="100" width="full">
      <VStack pl="50" width="full" align="left">
        <Box width={0.65}>
          {localFormData.title}
          <MarkdownViewer value={localFormData.description} />
        </Box>
        <Box pt="10" width="full">
          <TokenTable></TokenTable>
        </Box>
        <Box pt="10" width="full">
          <CreateTokenTriggerBtn></CreateTokenTriggerBtn>
        </Box>
        <Box pt="10" width="full">
          <AppOwnerOverview></AppOwnerOverview>
        </Box>
      </VStack>
    </Box>
  );
};
export default ApplicationInfo;
