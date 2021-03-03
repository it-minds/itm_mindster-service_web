import { Center, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { ActionIdDto } from "services/backend/nswagts";

import ActionTableItem from "./ActionTableItem";
interface ActionTableProps {
  tableData: ActionIdDto[];
}
const ActionTable: FC<ActionTableProps> = props => {
  const tableData = props.tableData;

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
          </Tr>
        </Thead>
        <Tbody>{tableBody}</Tbody>
      </Table>
    </Center>
  );
};

export default ActionTable;
