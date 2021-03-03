import { Tbody, Td, Tr, Wrap } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { ActionIdDto, IActionIdDto } from "services/backend/nswagts";
interface ActionTableItemProps {
  action: ActionIdDto;
}
const ActionTableItem: FC<ActionTableItemProps> = props => {
  const action = props.action;

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
