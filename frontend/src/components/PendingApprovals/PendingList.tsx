import { Box, Center, Flex, Heading, VStack, Wrap } from "@chakra-ui/react";
import { ApplicationContext } from "contexts/ApplicationContext";
import React, { FC, useContext } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import PendingListItem from "./PendingListItem";

const PendingList: FC = () => {
  const { appTokens } = useContext(ApplicationContext);

  return (
    <Center>
      <Wrap width="full" justify="center" margin="50">
        <VStack width="full">
          <VStack mb="40px">
            <Heading>Pending applications</Heading>
            <Box w="full" borderRadius="md" borderWidth="2px">
              {appTokens.map((appToken: AppTokenIdDto) => (
                <PendingListItem key={appToken.id} appToken={appToken}></PendingListItem>
              ))}
            </Box>
          </VStack>
          <Flex width="full"></Flex>
        </VStack>
      </Wrap>
    </Center>
  );
};

export default PendingList;
