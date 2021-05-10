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
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);

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

  useEffect(() => {
    if (keyword.length > 0 && users) {
      const timeOutId = setTimeout(() => {
        const filtered = users.filter(user => {
          return (
            user.name.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
            user.primaryEmail.toLowerCase().includes(keyword.toLowerCase())
          );
        });
        setFilteredUsers(filtered);
      }, 200);
      return () => clearTimeout(timeOutId);
    }
    if (keyword === "") setFilteredUsers(users);
  }, [keyword]);

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
        <UserList users={filteredUsers} />
      </Box>
    </Flex>
  );
};

export default GoogleSearchBar;
