import { Center, Heading, HStack, VStack, Wrap } from "@chakra-ui/react";
import ServiceTableMenu from "components/ServiceTable/ServiceTableMenus/ServiceTableMenu";
import { ServiceContext } from "contexts/ServiceContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import LibraryCard from "./LibraryCard";

const ServiceLibrary: FC = () => {
  const { services } = useContext(ServiceContext);

  return (
    <Center>
      <Wrap width="700px" justify="center">
        <Heading>Service Library</Heading>
        <ServiceTableMenu></ServiceTableMenu>

        <HStack spacing="24px">
          {services.map((Service: ServiceIdDto) => (
            <LibraryCard key={Service.id} service={Service}></LibraryCard>
          ))}
        </HStack>
      </Wrap>
    </Center>
  );
};

export default ServiceLibrary;
