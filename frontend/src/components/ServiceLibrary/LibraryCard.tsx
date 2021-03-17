import { Box, Button, Heading, Tag, TagLabel, Td, Tr } from "@chakra-ui/react";
import ServiceItemMenu from "components/ServiceTable/ServiceTableMenus/ServiceItemMenu/ServiceItemMenu";
import { useColors } from "hooks/useColors";
import Head from "next/head";
import React, { FC } from "react";
import { ServiceIdDto, ServiceStates } from "services/backend/nswagts";

type Props = {
  service: ServiceIdDto;
};

const LibraryCard: FC<Props> = ({ service }) => {
  const { hoverBg } = useColors();

  const stateColors = ["yellow", "green", "red"];

  return (
    <Box w="250px" h="250px" shadow="xl" borderWidth="1px" borderRadius="lg">
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="header" lineHeight="tight" isTruncated>
          <Heading fontSize="xl">{service.title}</Heading>
        </Box>
        <Box>{service.description}</Box>
        <Tag size="md" variant="subtle" colorScheme={stateColors[service.state]}>
          <TagLabel>{ServiceStates[service.state]}</TagLabel>
        </Tag>
        <ServiceItemMenu service={service}></ServiceItemMenu>
      </Box>
    </Box>
  );
};
export default LibraryCard;
