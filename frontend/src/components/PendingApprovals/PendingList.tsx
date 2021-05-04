import { Box, Center, Heading, VStack, Wrap } from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useContext } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import PendingListItem from "./PendingListItem";

const PendingList: FC = () => {
  const { pendingTokens } = useContext(ServiceViewContext);

  return (
    <Center>
      <Wrap width="full" justify="center" margin="50">
        <VStack width="full">
          <VStack mb="40px">
            <Heading>Pending applications</Heading>
            <Box w="full" borderRadius="md" borderWidth="2px">
              {pendingTokens.map((appToken: AppTokenIdDto) => (
                <PendingListItem key={appToken.id} appToken={appToken}></PendingListItem>
              ))}
            </Box>
          </VStack>
        </VStack>
      </Wrap>
    </Center>
  );
};

export default PendingList;
