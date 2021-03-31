import { Td, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { ActionIdDto } from "services/backend/nswagts";

type Props = {
  action: ActionIdDto;
};
const ActionTableItem: FC<Props> = ({ action }) => {
  return (
    <Tr>
      <Td>{action.id}</Td>
      <Td>{action.title}</Td>
    </Tr>
  );
};
export default ActionTableItem;
