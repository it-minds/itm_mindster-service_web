import { Center, Heading, Table, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { ViewContext } from "contexts/ViewContext";
import { FC, useContext } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import TokenTableItem from "./TokenTableItem";

const TokenTable: FC = () => {
  const { appTokens } = useContext(ViewContext);

  if (appTokens.length == 0) return null;
  return (
    <VStack w="full" align="left">
      <Heading size="h3">Tokens:</Heading>
      <Table borderWidth="2px" variant="striped" colorScheme="blue" size="md">
        <Thead>
          <Tr>
            <Th>
              {/* (currently id since token doesn't have name */}
              <Center>Name</Center>
            </Th>
            <Th w={0.7}>
              <Center>Description</Center>
            </Th>
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
