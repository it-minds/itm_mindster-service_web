import { Box, Heading } from "@chakra-ui/react";
import React, { FC } from "react";
import { AppTokenActionIdDto, AppTokenIdDto } from "services/backend/nswagts";

type Props = {
  appToken: AppTokenIdDto;
};

const PendingListItem: FC<Props> = ({ appToken }) => {
  return (
    <>
      {appToken.appTokenActions.length != 0 ? (
        <>
          <Box m="4" p="2" borderWidth="1px" borderRadius="sm" shadow="lg">
            Token id {appToken.id} with {appToken.appTokenActions.length} actions
          </Box>
          <Box>
            {appToken.appTokenActions.map((action: AppTokenActionIdDto) => (
              <Box key={action.id}>
                {" "}
                {action.actionId} State:{action.state}
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default PendingListItem;
