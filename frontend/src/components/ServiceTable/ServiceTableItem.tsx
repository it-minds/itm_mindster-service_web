import { Tag, TagLabel, Td, Tr } from "@chakra-ui/react";
import ServiceItemMenu from "components/ServiceTable/ServiceTableMenus/ServiceItemMenu/ServiceItemMenu";
import { useColors } from "hooks/useColors";
import React, { FC } from "react";
import { ServiceIdDto, ServiceStates } from "services/backend/nswagts";

interface ServiceTableItemProps {
  service: ServiceIdDto;
}

const ServiceTableItem: FC<ServiceTableItemProps> = ({ service }) => {
  const { hoverBg } = useColors();

  const stateColors = ["yellow", "green", "red"];

  return (
    <Tr
      key={service.id}
      _hover={{
        bgColor: hoverBg
      }}>
      <Td>{service.id}</Td>
      <Td>{service.title}</Td>
      <Td>{service.description}</Td>
      <Td>
        <Tag size="md" variant="subtle" colorScheme={stateColors[service.state]}>
          <TagLabel>{ServiceStates[service.state]}</TagLabel>
        </Tag>
      </Td>
      <Td>
        <ServiceItemMenu service={service}></ServiceItemMenu>
      </Td>
    </Tr>
  );
};
export default ServiceTableItem;
