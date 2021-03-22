import { Box, Center, Flex, Wrap } from "@chakra-ui/react";
import React, { FC } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import ActionList from "./ActionList";

type Props = {
  service: ServiceIdDto;
};

const RequestActions: FC<Props> = ({ service }) => {
  return (
    <Center>
      <Wrap width="full" justify="center">
        <Flex direction="column" width="full" align="center" justifyContent="center">
          <Box width="full" justifyContent="left" fontWeight="semibold" fontSize="lg">
            {service.title}
          </Box>
          <Box p="2" width="full" justifyContent="left">
            {service.description}
          </Box>
          <Box width="full" p={6}>
            <ActionList tableData={service.actions}></ActionList>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default RequestActions;
