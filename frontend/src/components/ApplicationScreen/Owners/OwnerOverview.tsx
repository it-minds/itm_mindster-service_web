import { Box, Heading, Tag, VStack } from "@chakra-ui/react";
import { ViewContext } from "contexts/ViewContext";
import { FC, useContext } from "react";
import { ApplicationOwnerIdDto } from "services/backend/nswagts";

import AddOwnersTriggerBtn from "./AddOwnersTriggerBtn";

const OwnerOverview: FC = () => {
  const { appOwners, currApplication } = useContext(ViewContext);

  if (currApplication == null) return null;
  return (
    <VStack align="left">
      <Heading size="h4">Application Owners:</Heading>
      <Box>
        {appOwners.map((owner: ApplicationOwnerIdDto) => (
          <Tag m="5px" colorScheme="facebook" key={owner.id}>
            {owner.email}
          </Tag>
        ))}
      </Box>
      <Box>
        <AddOwnersTriggerBtn></AddOwnersTriggerBtn>
      </Box>
    </VStack>
  );
};

export default OwnerOverview;
