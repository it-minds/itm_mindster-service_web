import { Box, Center, Heading, Select, Tag, TagLabel, VStack, Wrap } from "@chakra-ui/react";
import { ApplicationContext } from "contexts/ApplicationContext";
import { FC, useContext } from "react";
import { AppTokenActionIdDto, AppTokenIdDto, ServiceStates } from "services/backend/nswagts";

const AppToken: FC = () => {
  const { appTokens, currToken, setCurrToken } = useContext(ApplicationContext);
  const stateColors = ["yellow", "green", "red"];

  function handleSelectChange(value: number) {
    setCurrToken(appTokens.find(e => e.id == value));
  }
  return (
    <Center>
      <Wrap width="700px" justify="center">
        <VStack w="full">
          <Heading>App Tokens</Heading>

          <Select w="full" onChange={() => handleSelectChange(event.target.value)}>
            {appTokens.map((token: AppTokenIdDto) => (
              <option key={token.id} value={token.id}>
                {token.id} Token: {token.description}
              </option>
            ))}
          </Select>

          {currToken != null ? (
            <Box width="full">
              <Heading>{`Id: ${currToken.id} ${currToken.description}`}</Heading>
              {currToken.appTokenActions.map((action: AppTokenActionIdDto) => (
                <Box key={action.id}>
                  {action.actionId}
                  <Tag size="md" variant="subtle" colorScheme={stateColors[action.state]}>
                    <TagLabel>{ServiceStates[action.state]}</TagLabel>
                  </Tag>
                  <Box>{action.rejectionReason}</Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Heading>No Token selected</Heading>
          )}
        </VStack>
      </Wrap>
    </Center>
  );
};

export default AppToken;
