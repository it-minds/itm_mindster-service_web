import { Box, Center, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import LibraryCard from "./LibraryCard";

const ServiceLibrary: FC = () => {
  const { services } = useContext(AppViewContext);

  return (
    <Box height="full" width="full" justify="center">
      <VStack width="full">
        <Flex width="full">
          <SimpleGrid width="full" minChildWidth="300px" spacingX="25px" spacingY="25px">
            {services.map((Service: ServiceIdDto) => (
              <Center key={Service.id}>
                <LibraryCard service={Service}></LibraryCard>
              </Center>
            ))}
          </SimpleGrid>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ServiceLibrary;
