import { Td, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { ActionIdDto } from "services/backend/nswagts";
interface ActionTableItemProps {
  action: ActionIdDto;
}
const ActionTableItem: FC<ActionTableItemProps> = ({ action }) => {
  return (
    <Tr>
      <Td>{action.id}</Td>
      <Td>{action.title}</Td>
      <Td>{action.description}</Td>
      <Td>{action.adminNote}</Td>
    </Tr>
  );
};
export default ActionTableItem;
