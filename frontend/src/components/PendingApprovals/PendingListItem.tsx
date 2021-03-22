import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import React, { FC } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

type Props = {
  appToken: AppTokenIdDto;
};

const PendingListItem: FC<Props> = ({ appToken }) => {
  return (
    <>
      {appToken.appTokenActions.length != 0 ? (
        <Flex align="center" m="4" p="2" borderWidth="1px" borderRadius="sm">
          <Flex flexDirection="column">
            <Box>{`Token: ${appToken.id} with ${appToken.appTokenActions.length} actions`}</Box>
            <Box padding="2">{appToken.description}</Box>
          </Flex>
          <Spacer />
          <Button>Review</Button>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};
export default PendingListItem;
