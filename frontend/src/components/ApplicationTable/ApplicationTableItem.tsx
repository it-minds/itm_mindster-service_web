import { Td, Tr } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import React, { FC } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

import ApplicationItemMenu from "./ApplicationTableMenus/ApplicationItemMenus/ApplicationItemMenu";

type Props = {
  application: ApplicationIdDto;
  fetchData: () => Promise<void>;
};
const ApplicationTableItem: FC<Props> = ({ application, fetchData }) => {
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
        <ApplicationItemMenu fetchData={fetchData} application={application}></ApplicationItemMenu>
      </Td>
    </Tr>
  );
};
export default ApplicationTableItem;
