import { Box, Grid, Tag, TagLabel } from "@chakra-ui/react";
import { FC } from "react";
import { AppTokenActionIdDto, ServiceStates } from "services/backend/nswagts";

type Props = {
  action: AppTokenActionIdDto;
};

const TokenActionListItem: FC<Props> = ({ action }) => {
  const stateColors = ["yellow", "green", "red"];

  return (
    <Grid templateColumns="repeat(3, 1fr)">
      <Box mt="2">{` Action id: ${action.actionId}`}</Box>
      <Box mt="2">
        State:
        <Tag ml="2" size="md" variant="subtle" colorScheme={stateColors[action.state]}>
          <TagLabel>{ServiceStates[action.state]}</TagLabel>
        </Tag>
      </Box>
      <Box mt="2">{` Rejection Reason: ${action.rejectionReason}`}</Box>
    </Grid>
  );
};

export default TokenActionListItem;
