import { Checkbox, Td, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { ActionIdDto } from "services/backend/nswagts";
type Props = {
  action: ActionIdDto;
  checked: boolean;
  addAction: (data: number) => void;
};
const CopyActionListItem: FC<Props> = ({ action, checked, addAction }) => {
  return (
    <Tr>
      <Td maxW="200px">{action.actionIdentifier}</Td>
      <Td>{action.description}</Td>
      <Td>
        <Checkbox
          isChecked={checked}
          size="md"
          colorScheme="green"
          onChange={() => addAction(action.id)}
        />
      </Td>
    </Tr>
  );
};
export default CopyActionListItem;
