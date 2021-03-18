import { Center, Checkbox, Td, Tr } from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";
import { ActionIdDto } from "services/backend/nswagts";
interface ActionTableItemProps {
  action: ActionIdDto;
  checked: boolean;
  addAction: (data: number, added: boolean) => void;
}
const ActionListItem: FC<ActionTableItemProps> = ({ action, checked, addAction }) => {
  const [isChecked, setChecked] = useState(checked);
  const handleOnChange = useCallback(() => {
    addAction(action.id, !checked);
  }, [action]);
  return (
    <Tr>
      <Td>{action.id}</Td>
      <Td>{action.title}</Td>
      <Td>{action.description}</Td>
      <Td>{action.adminNote}</Td>
      <Td>
        <Checkbox
          isChecked={isChecked}
          size="md"
          colorScheme="green"
          onChange={() => handleOnChange()}
          inputProps={{ "aria-label": "Checkbox A" }}
        />
      </Td>
    </Tr>
  );
};
export default ActionListItem;
