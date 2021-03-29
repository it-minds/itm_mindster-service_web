import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import React, { FC } from "react";
import { AppTokenActionIdDto } from "services/backend/nswagts";

import TokenActionListItem from "./ActionListItem";

type Props = {
  actions: AppTokenActionIdDto[];
};

const TokenActionList: FC<Props> = ({ actions }) => {
  return (
    <Box>
      <Heading>Actions</Heading>
      <List>
        {actions.map(action => (
          <ListItem key={action.id}>
            <TokenActionListItem action={action}></TokenActionListItem>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TokenActionList;
