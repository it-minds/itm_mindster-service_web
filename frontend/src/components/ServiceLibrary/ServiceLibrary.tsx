import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { IServiceIdDto, ServiceIdDto } from "services/backend/nswagts";

import LibraryCard from "./LibraryCard";
import LibrarySearchBar from "./LibrarySearchBar";

const ServiceLibrary: FC = () => {
  const { services } = useContext(AppViewContext);
  const [keyword, setKeyWord] = useState("");
  const [filteredServices, setFilteredServices] = useState<IServiceIdDto[]>(services);

  useEffect(() => {
    if (keyword.length > 0) {
      const timeOutId = setTimeout(() => {
        const filtered = services.filter(service => {
          return service.title.toLowerCase().includes(keyword.toLowerCase());
        });
        setFilteredServices(filtered);
      }, 200);
      return () => clearTimeout(timeOutId);
    }
    if (keyword === "") setFilteredServices(services);
  }, [keyword]);

  return (
    <Box height="full" width="full" justify="center">
      <LibrarySearchBar keyword={keyword} setKeyword={setKeyWord} />
      <SimpleGrid mt="5px" width="full" minChildWidth="200px" spacing="25px">
        {filteredServices.map((service: ServiceIdDto) => (
          <Center key={service.id}>
            <LibraryCard service={service}></LibraryCard>
          </Center>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ServiceLibrary;
