import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import LibraryCard from "./LibraryCard";

const ServiceLibrary: FC = () => {
  const { services } = useContext(AppViewContext);

  return (
    <Box height="full" width="full" justify="center">
      <SimpleGrid width="full" minChildWidth="200px" spacing="25px">
        {services.map((Service: ServiceIdDto) => (
          <Center key={Service.id}>
            <LibraryCard service={Service}></LibraryCard>
          </Center>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ServiceLibrary;
