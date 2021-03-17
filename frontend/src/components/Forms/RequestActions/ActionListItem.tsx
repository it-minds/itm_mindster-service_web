import { Center, Checkbox, Td, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { ActionIdDto } from "services/backend/nswagts";
interface ActionTableItemProps {
  action: ActionIdDto;
  checked: boolean;
}
const ActionListItem: FC<ActionTableItemProps> = ({ action, checked }) => {
  return (
    <Tr>
      <Td>{action.id}</Td>
      <Td>{action.title}</Td>
      <Td>{action.description}</Td>
      <Td>{action.adminNote}</Td>
      <Td>
        <Checkbox
          isChecked={checked}
          size="lg"
          colorScheme="green"
          inputProps={{ "aria-label": "Checkbox A" }}
        />
      </Td>
    </Tr>
  );
};
export default ActionListItem;
