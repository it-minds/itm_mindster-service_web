import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import React, { FC, useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genGoogleUserClient } from "services/backend/apiClients";
import { IUser } from "services/backend/nswagts";
import { logger } from "utils/logger";

import UserList from "./UserList";

const GoogleSearchBar: FC = () => {
  const [keyword, setKeyword] = useState("");
  const [users, dispatchUsers] = useReducer(ListReducer<IUser>("primaryEmail"), []);

  useState();

  const fetchGoogleUsers = useCallback(async () => {
    try {
      const client = await genGoogleUserClient();
      const data = await client.getAllUsers();

      if (data && data.length > 0)
        dispatchUsers({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("UserClient.getAllUsers got no data");
    } catch (err) {
      logger.warn("UserClient.getAllUsers Error", err);
    }
  }, []);

  useEffect(() => {
    fetchGoogleUsers();
  }, [fetchGoogleUsers]);

  return (
    <Flex direction="column">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input
          w="full"
          borderRadius="full"
          value={keyword}
          placeholder={"search for service"}
          onChange={e => setKeyword(e.target.value)}
        />
      </InputGroup>
      <Box>
        <UserList users={users} />
      </Box>
    </Flex>
  );
};

export default GoogleSearchBar;
