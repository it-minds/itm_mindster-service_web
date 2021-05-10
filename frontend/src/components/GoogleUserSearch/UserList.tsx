import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { IServiceIdDto, IUser, ServiceIdDto, User } from "services/backend/nswagts";

import UserListItem from "./UserListItem";

type Props = {
  users: IUser[];
};
const UserList: FC<Props> = ({ users }) => {
  // useEffect(() => {
  //   if (keyword.length > 0) {
  //     const timeOutId = setTimeout(() => {
  //       const filtered = services.filter(service => {
  //         return service.title.toLowerCase().includes(keyword.toLowerCase());
  //       });
  //       setFilteredServices(filtered);
  //     }, 200);
  //     return () => clearTimeout(timeOutId);
  //   }
  //   if (keyword === "") setFilteredServices(services);
  // }, [keyword]);

  return (
    <Box height="full" width="full" justify="center">
      {users.map((user: User) => (
        <Center key={user.primaryEmail}>
          <UserListItem user={user} />
        </Center>
      ))}
    </Box>
  );
};

export default UserList;
