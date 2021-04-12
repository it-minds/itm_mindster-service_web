import { Box, Center, Flex, Wrap } from "@chakra-ui/react";
import React, { FC } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import RequestActionList from "./RequestActionList";

type Props = {
  service: ServiceIdDto;
};

const RequestActions: FC<Props> = ({ service }) => {
  return (
    <Center>
      <Wrap width="full" justify="center">
        <Flex direction="column" width="full" align="center" justifyContent="center">
          <Box mt="10px" width="full" justifyContent="left" fontWeight="semibold" fontSize="lg">
            Request acces to some of the following actions:
          </Box>
          <Box width="full" p={6}>
            <RequestActionList tableData={service.actions}></RequestActionList>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default RequestActions;
