import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IUser, User } from "services/backend/nswagts";

type Props = {
  user: User;
  submitCallback: (user: IUser) => void;
  keyword: string;
};
const UserListItem: FC<Props> = ({ user, submitCallback, keyword }) => {
  const { hoverBg } = useColors();
  const [nameMatches, setNameMatches] = useState<{ text: string; bold: boolean }[]>([]);
  const [emailMatches, setEmailMatches] = useState<{ text: string; bold: boolean }[]>([]);

  useEffect(() => {
    setNameMatches(findMatches(keyword, user.name.fullName));
    setEmailMatches(findMatches(keyword, user.primaryEmail));
  }, [keyword, user]);

  const findMatches = useCallback((keyword: string, text: string) => {
    const newMatches: { text: string; bold: boolean }[] = [];
    const word = text;

    const index = word.toUpperCase().indexOf(keyword.toUpperCase());
    if (index == 0 && word.length == keyword.length) {
      newMatches.push({ text: word + " ", bold: true });
    } else {
      if (index === -1) newMatches.push({ text: word + " ", bold: false });
      if (index === 0) {
        newMatches.push({ text: word.slice(0, keyword.length), bold: true });
        newMatches.push({ text: word.slice(keyword.length) + " ", bold: false });
      }
      if (index === word.length - keyword.length) {
        newMatches.push({ text: word.slice(0, index), bold: false });
        newMatches.push({ text: word.slice(index) + " ", bold: true });
      }
      if (index > 0 && index < word.length - keyword.length) {
        newMatches.push({ text: word.slice(0, index), bold: false });
        newMatches.push({ text: word.slice(index, index + keyword.length), bold: true });
        newMatches.push({ text: word.slice(index + keyword.length) + " ", bold: false });
      }
    }
    return newMatches;
  }, []);

  if (!user || !user.name) return null;
  return (
    <Flex
      onClick={() => submitCallback(user)}
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
        <Flex>
          {nameMatches.map(o => (
            <Box key={nameMatches.indexOf(o)}>
              {o.bold ? (
                <>
                  <Text fontWeight="bold" whiteSpace="break-spaces">
                    {o.text}
                  </Text>
                </>
              ) : (
                <Text whiteSpace="break-spaces">{o.text}</Text>
              )}
            </Box>
          ))}
        </Flex>
        <Flex>
          {emailMatches.map(o => (
            <Box key={emailMatches.indexOf(o)}>
              {o.bold ? (
                <>
                  <Text fontWeight="bold" fontSize="sm" whiteSpace="break-spaces">
                    {o.text}
                  </Text>
                </>
              ) : (
                <Text fontSize="sm" whiteSpace="break-spaces">
                  {o.text}
                </Text>
              )}
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default UserListItem;
