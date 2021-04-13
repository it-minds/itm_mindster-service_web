import { Box, Center, Heading, Table, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { FC, useContext } from "react";
import { IAppTokenActionIdDto } from "services/backend/nswagts";

import TokenStatusListItem from "./TokenStatusListItem";

const TokenStatusList: FC = () => {
  const { currToken } = useContext(AppViewContext);
  console.log("STATUSLISTEN");
  console.log(currToken);

  if (currToken == null) return null;
  return (
    <Box h="full" p="5" borderWidth="1px" align="left">
      {currToken.appTokenActions.map((action: IAppTokenActionIdDto) => (
        <TokenStatusListItem key={action.id} tokenAction={action} />
      ))}
    </Box>
  );
};

export default TokenStatusList;
