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
import ViewAllBtn from "components/Common/ViewAllBtn";
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
      <Wrap justify="center">
        <VStack>
          <HStack mb="40px">
            <Heading>Service Library</Heading>
            <ServiceTableMenu></ServiceTableMenu>
          </HStack>
          <Flex width="full">
            <Box p="4">Services</Box>
            <Spacer />
            <Box onClick={() => setAllShown(!allShown)} p="4">
              <ViewAllBtn totalItems={services.length}></ViewAllBtn>
            </Box>
          </Flex>
          {allShown ? (
            <SimpleGrid columns={4} spacingX="20px" spacingY="50px">
              {services.map((Service: ServiceIdDto) => (
                <LibraryCard key={Service.id} service={Service}></LibraryCard>
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={4} spacingX="20px" spacingY="50px">
              {services.slice(0, 4).map((Service: ServiceIdDto) => (
                <LibraryCard key={Service.id} service={Service}></LibraryCard>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Wrap>
    </Center>
  );
};

export default ServiceLibrary;
