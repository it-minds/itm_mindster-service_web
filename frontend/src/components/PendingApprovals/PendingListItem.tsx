import { Box, Flex, Spacer } from "@chakra-ui/react";
import React, { FC } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import ReviewTokenModalTrigger from "../Forms/ReviewAcces/ReviewTokenModalTrigger";

type Props = {
  appToken: AppTokenIdDto;
};

const PendingListItem: FC<Props> = ({ appToken }) => {
  if (appToken.appTokenActions.length == 0) return null;

  return (
    <Flex align="center" m="4" p="2" borderWidth="1px" borderRadius="sm">
      <Flex flexDirection="column">
        <Box>{`Token: ${appToken.id} with ${appToken.appTokenActions.length} actions`}</Box>
        <Box padding="2">{appToken.description}</Box>
      </Flex>
      <Spacer />
      <ReviewTokenModalTrigger token={appToken}></ReviewTokenModalTrigger>
    </Flex>
  );
};
export default PendingListItem;
