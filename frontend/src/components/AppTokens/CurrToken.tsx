import { Box, Center, Flex, Heading, Spacer, VStack, Wrap } from "@chakra-ui/react";
import ShowServiceLibraryBtn from "components/ServiceLibrary/ShowServiceLibraryBtn";
import { ApplicationContext } from "contexts/ApplicationContext";
import { FC, useContext } from "react";
import { AppTokenActionIdDto } from "services/backend/nswagts";

import CurrTokenAction from "./CurrTokenAction";

const CurrToken: FC = () => {
  const { currToken } = useContext(ApplicationContext);

  return (
    <Center>
      <Wrap width="700px" justify="center">
        <VStack w="full">
          {currToken != null ? (
            <Box p="5" borderWidth="1px" width="full" borderRadius="sm">
              <Flex>
                <Heading mb="2" size="md">{`Id: ${currToken.id} ${currToken.description}`}</Heading>
                <Spacer />
                <Box>
                  <ShowServiceLibraryBtn></ShowServiceLibraryBtn>
                </Box>
              </Flex>
              <Box p="2">
                Actions:
                <Box p="2">
                  {currToken.appTokenActions.map((action: AppTokenActionIdDto) => (
                    <CurrTokenAction key={action.id} action={action}></CurrTokenAction>
                  ))}
                </Box>
              </Box>
            </Box>
          ) : (
            <Heading margin="10" size="lg">
              No Token selected
            </Heading>
          )}
        </VStack>
      </Wrap>
    </Center>
  );
};

export default CurrToken;
