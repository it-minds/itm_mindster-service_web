import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  VStack,
  Wrap
} from "@chakra-ui/react";
import ServiceTableMenu from "components/ServiceTable/ServiceTableMenus/ServiceTableMenu";
import { ServiceContext } from "contexts/ServiceContext";
import React, { FC, useContext, useState } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import LibraryCard from "./LibraryCard";

const ServiceLibrary: FC = () => {
  const { services } = useContext(ServiceContext);
  const [allShown, setAllShown] = useState(false);

  return (
    <Center>
      <Wrap width="full" justify="center" margin="50">
        <VStack width="full">
          <HStack mb="40px">
            <Heading>Service Library</Heading>
            <ServiceTableMenu></ServiceTableMenu>
          </HStack>
          <Flex width="full">
            <Box p="4">Services</Box>
            <Spacer />
            <Box onClick={() => setAllShown(!allShown)} p="4">
              <Box cursor="pointer">
                {!allShown ? "View all" : "Hide all"} ({services.length})
              </Box>
            </Box>
          </Flex>
          <Flex width="full">
            <SimpleGrid width="full" minChildWidth="300px" spacingX="20px" spacingY="50px">
              {(allShown ? services : services.slice(0, 5)).map((Service: ServiceIdDto) => (
                <Center key={Service.id}>
                  <LibraryCard service={Service}></LibraryCard>
                </Center>
              ))}
            </SimpleGrid>
          </Flex>
        </VStack>
      </Wrap>
    </Center>
  );
};

export default ServiceLibrary;
