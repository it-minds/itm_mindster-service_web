import { Box, Center, Flex, SimpleGrid } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import LibraryCard from "./LibraryCard";

const ServiceLibrary: FC = () => {
  const { services } = useContext(AppViewContext);

  return (
    <Box padding="50px" height="full" width="full" justify="center">
      <Flex width="full">
        <SimpleGrid width="full" minChildWidth="300px" spacing="25px">
          {services.map((Service: ServiceIdDto) => (
            <Center key={Service.id}>
              <LibraryCard service={Service}></LibraryCard>
            </Center>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default ServiceLibrary;
