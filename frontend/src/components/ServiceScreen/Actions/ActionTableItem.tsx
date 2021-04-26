import { Td, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { IActionIdDto } from "services/backend/nswagts";

import ApproverMenu from "./ActionApprovers/ApproverMenu";

type Props = {
  action: IActionIdDto;
};
const ActionTableItem: FC<Props> = ({ action }) => {
  return (
    <Tr>
      <Td>{action.id}</Td>
      <Td>{action.title}</Td>
      <Td>
        <ApproverMenu action={action} />
      </Td>
    </Tr>
  );
};
export default ActionTableItem;
