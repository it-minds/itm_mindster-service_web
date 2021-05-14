import { Center, Heading, Table, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { FC, useContext } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import TokenTableItem from "./TokenTableItem";

const TokenTable: FC = () => {
  const { appTokens } = useContext(AppViewContext);

  if (appTokens.length == 0) return null;
  return (
    <VStack w="full" align="left">
      <Heading size="h3">Tokens:</Heading>
      <Table borderWidth="1px" variant="striped" colorScheme="gray" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th w={0.7}>Description</Th>
            <Th>
              <Center>Actions</Center>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {appTokens.map((token: AppTokenIdDto) => (
            <TokenTableItem key={token.id} token={token}></TokenTableItem>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default TokenTable;
