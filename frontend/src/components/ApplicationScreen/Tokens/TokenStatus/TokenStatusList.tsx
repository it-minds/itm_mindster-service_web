import { Center, Heading, Table, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { FC, useContext } from "react";
import { IAppTokenActionIdDto } from "services/backend/nswagts";

import TokenStatusListItem from "./TokenStatusListItem";

const TokenStatusList: FC = () => {
  const { currToken } = useContext(AppViewContext);

  if (currToken == null) return null;
  return (
    <VStack w="full" align="left">
      <Heading size="h3">Status:</Heading>
      {currToken.appTokenActions.map((action: IAppTokenActionIdDto) => (
        <TokenStatusListItem key={action.id} tokenAction={action} />
      ))}
    </VStack>
  );
};

export default TokenStatusList;
