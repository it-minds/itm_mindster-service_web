import { Center, Td, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import ViewActionTriggerBtn from "./TokenActions/ViewActionsTriggerBtn";

type Props = {
  token: AppTokenIdDto;
};
const TokenTableItem: FC<Props> = ({ token }) => {
  return (
    <Tr>
      <Td>
        <Center>{token.id}</Center>
      </Td>
      <Td>
        <Center> {token.description}</Center>
      </Td>
      <Td>
        <Center>
          <ViewActionTriggerBtn token={token}></ViewActionTriggerBtn>
        </Center>
      </Td>
    </Tr>
  );
};
export default TokenTableItem;
