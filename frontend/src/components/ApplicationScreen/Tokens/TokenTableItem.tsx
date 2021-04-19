import { Button, Center, Td, Tr } from "@chakra-ui/react";
import ServiceLibraryDrawer from "components/ServiceLibrary/ServiceLibraryDrawer";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useState } from "react";
import { AppTokenIdDto, TokenStates } from "services/backend/nswagts";

import GetJwtTriggerBtn from "./AuthToken/GetJwtTriggerBtn";
import SeeTokenStatusDrawer from "./TokenStatus/SeeTokenStatusDrawer";

type Props = {
  token: AppTokenIdDto;
};
const TokenTableItem: FC<Props> = ({ token }) => {
  const { fetchUpdatedToken } = useContext(AppViewContext);
  const [libraryOpen, setOpen] = useState(false);
  return (
    <Tr>
      <Td>
        <Center>{token.tokenIdentifier}</Center>
      </Td>
      <Td>
        <Center> {token.description}</Center>
      </Td>
      <Td>
        <Center>
          {token.state == TokenStates.Created && (
            <Button
              borderWidth="1px"
              borderColor="black"
              onClick={async () => {
                await fetchUpdatedToken(token.id);
                setOpen(true);
              }}>
              Browse Services
            </Button>
          )}
          {token.state == TokenStates.AwaitingReview && (
            <SeeTokenStatusDrawer
              buttonText="Check status"
              submitOnOpen={() => fetchUpdatedToken(token.id)}
              submitOnClose={() => null}
            />
          )}
          {token.state == TokenStates.Reviewed && (
            <SeeTokenStatusDrawer
              buttonText="Check status"
              submitOnOpen={() => fetchUpdatedToken(token.id)}
              submitOnClose={() => null}
            />
          )}
          {token.state == TokenStates.JwtReceived && (
            <GetJwtTriggerBtn submitOnOpen={() => fetchUpdatedToken(token.id)} />
          )}
          <ServiceLibraryDrawer Open={libraryOpen} setOpen={setOpen} />
        </Center>
      </Td>
    </Tr>
  );
};
export default TokenTableItem;
