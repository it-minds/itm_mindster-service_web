import {
  Button,
  Center,
  Heading,
  propNames,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Wrap
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useEffect, useState } from "react";
import { ActionIdDto, IActionIdDto, ServiceIdDto } from "services/backend/nswagts";

import ActionTableItem from "./ActionTableItem";
interface ActionTableProps {
  tableData: ActionIdDto[];
}
const ActionTable: FC<ActionTableProps> = props => {
  const tableData = props.tableData;

  const { t } = useLocales();

  const tableBody = tableData.map((Action: ActionIdDto) => (
    <ActionTableItem key={Action.id} action={Action}></ActionTableItem>
  ));

  return (
    <Center>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Admin Note</Th>
            <Th>Service Id</Th>
          </Tr>
        </Thead>
        <Tbody>{tableBody}</Tbody>
      </Table>
    </Center>
  );
};

export default ActionTable;
