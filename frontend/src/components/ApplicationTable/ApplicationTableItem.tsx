import { Td, Tr } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import React, { FC } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

import ApplicationItemMenu from "./ApplicationTableMenus/ApplicationItemMenus/ApplicationItemMenu";

type Props = {
  application: ApplicationIdDto;
};
const ApplicationTableItem: FC<Props> = ({ application }) => {
  const { hoverBg } = useColors();

  return (
    <Tr
      key={application.id}
      _hover={{
        bgColor: hoverBg
      }}>
      <Td>{application.id}</Td>
      <Td>{application.title}</Td>
      <Td>{application.description}</Td>
      <Td>
        <ApplicationItemMenu application={application}></ApplicationItemMenu>
      </Td>
    </Tr>
  );
};
export default ApplicationTableItem;
