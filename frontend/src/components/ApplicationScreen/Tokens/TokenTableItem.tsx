import { Button, Center, Td, Tr } from "@chakra-ui/react";
import ServiceLibraryDrawer from "components/ServiceLibrary/ServiceLibraryDrawer";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useState } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

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
          {token.appTokenActions.length != 0 ? (
            <SeeTokenStatusDrawer
              submitOnOpen={() => fetchUpdatedToken(token.id)}
              submitOnClose={() => null}
            />
          ) : (
            <>
              <Button
                borderWidth="1px"
                borderColor="black"
                onClick={async () => {
                  await fetchUpdatedToken(token.id);
                  setOpen(true);
                }}>
                Browse Services
              </Button>
              <ServiceLibraryDrawer Open={libraryOpen} setOpen={setOpen} />
            </>
          )}
        </Center>
      </Td>
    </Tr>
  );
};
export default TokenTableItem;
