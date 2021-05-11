import { Box, Center } from "@chakra-ui/react";
import React, { FC } from "react";
import { IUser, User } from "services/backend/nswagts";

import UserListItem from "./UserListItem";
const maxResults = 7;
type Props = {
  users: IUser[];
  submitCallback: (user: IUser) => void;
  keyword: string;
};
const UserList: FC<Props> = ({ users, submitCallback, keyword }) => {
  return (
    <Box height="full" width="full" justify="center">
      {users.slice(0, maxResults).map((user: User) => (
        <Center key={user.primaryEmail}>
          <UserListItem keyword={keyword} submitCallback={submitCallback} user={user} />
        </Center>
      ))}
    </Box>
  );
};

export default UserList;
