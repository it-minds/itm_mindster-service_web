import { Checkbox, Td, Tr } from "@chakra-ui/react";
import React, { FC, useCallback } from "react";
import { ActionIdDto } from "services/backend/nswagts";
type Props = {
  action: ActionIdDto;
  checked: boolean;
  addAction: (data: number) => void;
};
const RequestActionListItem: FC<Props> = ({ action, checked, addAction }) => {
  const handleOnChange = useCallback(() => {
    addAction(action.id);
  }, [action]);
  return (
    <Tr>
      <Td>
        <Checkbox
          isChecked={checked}
          size="md"
          colorScheme="green"
          onChange={() => handleOnChange()}
        />
      </Td>
      <Td maxW="100px">{action.actionIdentifier}</Td>
      <Td>{action.description}</Td>
    </Tr>
  );
};
export default RequestActionListItem;
