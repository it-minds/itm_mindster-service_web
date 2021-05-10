import { Box, Flex, Heading, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import Head from "next/head";
import React, { FC } from "react";
import { User } from "services/backend/nswagts";

type Props = {
  user: User;
};

const UserListItem: FC<Props> = ({ user }) => {
  const { hoverBg } = useColors();

  return (
    <Flex
      _hover={{
        bgColor: hoverBg
      }}
      cursor={"pointer"}
      align="center"
      w="320px"
      h="50px">
      <Box ml="10px">
        <Image
          rounded="full"
          boxSize="35px"
          src={user.thumbnailPhotoUrl}
          fallbackSrc="https://via.placeholder.com/150"
        />
      </Box>
      <Flex py="3px" ml="10px" direction="column">
        <Text fontSize="md">{user.name.fullName}</Text>
        <Text fontSize="sm">{user.primaryEmail}</Text>
      </Flex>
    </Flex>
  );
};
export default UserListItem;
