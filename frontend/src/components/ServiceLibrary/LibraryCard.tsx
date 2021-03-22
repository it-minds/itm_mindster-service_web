import { Box, Heading } from "@chakra-ui/react";
import ServiceItemMenu from "components/ServiceTable/ServiceTableMenus/ServiceItemMenu/ServiceItemMenu";
import { useColors } from "hooks/useColors";
import React, { FC } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

type Props = {
  service: ServiceIdDto;
};

const LibraryCard: FC<Props> = ({ service }) => {
  const { hoverBg } = useColors();

  return (
    <Box
      cursor="pointer"
      _hover={{
        bgColor: hoverBg
      }}
      w="300px"
      h="250px"
      shadow="xl"
      borderWidth="1px"
      borderRadius="sm">
      <Box p="6">
        <Box mt="1" as="header">
          <Heading fontSize="xl">{`${service.id} ${service.title}`}</Heading>
        </Box>
        <Box mt="2">{service.description}</Box>

        <ServiceItemMenu service={service}></ServiceItemMenu>
      </Box>
    </Box>
  );
};
export default LibraryCard;
