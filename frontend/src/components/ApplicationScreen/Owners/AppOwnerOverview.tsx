import { Box, Heading, Tag, VStack } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { FC, useContext } from "react";
import { ApplicationOwnerIdDto } from "services/backend/nswagts";

const AppOwnerOverview: FC = () => {
  const { appOwners, currApplication } = useContext(AppViewContext);

  if (currApplication == null) return null;
  return (
    <VStack align="left">
      <Heading size="h4">Application Owners:</Heading>
      <Box>
        {appOwners.map((owner: ApplicationOwnerIdDto) => (
          <Tag m="5px" key={owner.id}>
            {owner.email}
          </Tag>
        ))}
      </Box>
    </VStack>
  );
};

export default AppOwnerOverview;
