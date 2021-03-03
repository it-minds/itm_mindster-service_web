import { Button, Center, Heading, propNames, Tbody, Td, Tr, Wrap } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IServiceIdDto, ServiceIdDto, ServiceStates } from "services/backend/nswagts";
interface ServiceTableItemProps {
  tableData: ServiceIdDto[];
}
const ServiceTableItem: FC<ServiceTableItemProps> = props => {
  const tableData = props.tableData;

  const tableItems = tableData.map((Service: IServiceIdDto) => (
    <Tr key={Service.id}>
      <Td>{Service.id}</Td>
      <Td>{Service.title}</Td>
      <Td>{Service.description}</Td>
      <Td>{Service.state}</Td>
    </Tr>
  ));
  return <Tbody>{tableItems}</Tbody>;
};
export default ServiceTableItem;
