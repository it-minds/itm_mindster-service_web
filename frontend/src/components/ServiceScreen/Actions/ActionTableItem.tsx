import { Center, Td, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { IActionIdDto } from "services/backend/nswagts";

import ApproverMenu from "./ActionApprovers/ApproverMenu";

type Props = {
  action: IActionIdDto;
};
const ActionTableItem: FC<Props> = ({ action }) => {
  return (
    <Tr overflowY="hidden">
      <Td maxW="100px">{action.actionIdentifier}</Td>
      <Td>{action.description}</Td>
      <Td>
        <Center overflowY="hidden">
          <ApproverMenu action={action} />
        </Center>
      </Td>
    </Tr>
  );
};
export default ActionTableItem;
