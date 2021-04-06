import { Box, Heading, Tag, VStack } from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { FC, useContext } from "react";
import { IServiceOwnerIdDto } from "services/backend/nswagts";

import AddServiceOwnersTriggerBtn from "./AddServiceOwnerTriggerBtn";

const ServiceOwnerOverview: FC = () => {
  const { serviceOwners, currService } = useContext(ServiceViewContext);

  if (currService == null) return null;
  return (
    <VStack align="left">
      <Heading size="h4">Service Owners:</Heading>
      <Box>
        {serviceOwners.map((owner: IServiceOwnerIdDto) => (
          <Tag m="5px" key={owner.id}>
            {owner.email}
          </Tag>
        ))}
      </Box>
      <Box>
        <AddServiceOwnersTriggerBtn />
      </Box>
    </VStack>
  );
};

export default ServiceOwnerOverview;
