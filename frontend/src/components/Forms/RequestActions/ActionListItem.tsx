import { Center, Checkbox, Td, Tr } from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";
import { ActionIdDto } from "services/backend/nswagts";
type Props = {
  actionId: number;
  checked: boolean;
  addAction: (data: number) => void;
};
const ActionListItem: FC<Props> = ({ actionId: action, checked, addAction }) => {
  const handleOnChange = useCallback(() => {
    addAction(actionId);
  }, [action]);
  return (
    <Tr>
      <Td>{action.id}</Td>
      <Td>{action.title}</Td>
      <Td>{action.description}</Td>
      <Td>{action.adminNote}</Td>
      <Td>
        <Checkbox
          isChecked={checked}
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
