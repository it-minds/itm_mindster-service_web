import { Center, Heading, Select, VStack, Wrap } from "@chakra-ui/react";
import { ApplicationContext } from "contexts/ApplicationContext";
import { FC, useContext } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import CurrToken from "./CurrToken";

const AppToken: FC = () => {
  const { appTokens, setCurrToken } = useContext(ApplicationContext);

  function handleSelectChange(value: string | number) {
    setCurrToken(appTokens.find(e => e.id == value));
  }
  return (
    <Center>
      <Wrap width="700px" justify="center">
        <VStack w="full">
          <Heading>App Tokens</Heading>

          <Select w="full" onChange={event => handleSelectChange(event.target.value)}>
            {appTokens.map((token: AppTokenIdDto) => (
              <option key={token.id} value={token.id}>
                {token.id} Token: {token.description}
              </option>
            ))}
          </Select>
          <CurrToken></CurrToken>
        </VStack>
      </Wrap>
    </Center>
  );
};

export default AppToken;
