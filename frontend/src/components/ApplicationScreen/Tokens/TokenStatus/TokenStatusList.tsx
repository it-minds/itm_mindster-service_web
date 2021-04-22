import { Box, Heading } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { FC, useContext, useEffect, useState } from "react";
import { IAppTokenActionIdDto } from "services/backend/nswagts";

import TokenStatusListItem from "./TokenStatusListItem";

const TokenStatusList: FC = () => {
  const { currToken } = useContext(AppViewContext);
  const [services, setTokenServices] = useState<number[]>([]);

  /**
   * Used to divide the different actions into the respective services for
   */
  useEffect(() => {
    const services = currToken.appTokenActions.map(action => {
      return action.action.serviceId;
    });
    const set = new Set(services);
    setTokenServices(Array.from(set));
  }, [currToken]);

  if (currToken == null) return null;

  return (
    <Box overflowY="auto" h="full" p="5" w="full" align="left">
      {services.map((x: number) => (
        <Box key={x}>
          <Heading size="md">Service: {x}</Heading>
          {currToken.appTokenActions
            .filter((action: IAppTokenActionIdDto) => action.action.serviceId == x)
            .map((action: IAppTokenActionIdDto) => (
              <TokenStatusListItem key={action.id} tokenAction={action} />
            ))}
        </Box>
      ))}
    </Box>
  );
};

export default TokenStatusList;
