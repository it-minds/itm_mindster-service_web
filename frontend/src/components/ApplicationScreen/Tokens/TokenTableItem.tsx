import { Center, Td, Tr } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import SeeTokenStatusDrawer from "./TokenStatus/SeeTokenStatusDrawer";

type Props = {
  token: AppTokenIdDto;
};
const TokenTableItem: FC<Props> = ({ token }) => {
  const { fetchUpdatedToken } = useContext(AppViewContext);
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
          <SeeTokenStatusDrawer
            submitOnOpen={() => fetchUpdatedToken(token.id)}
            submitOnClose={() => null}
          />
          {/* <ViewActionTriggerBtn token={token}></ViewActionTriggerBtn> */}
        </Center>
      </Td>
    </Tr>
  );
};
export default TokenTableItem;
