import { Td, Tr } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import React, { FC } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import ApplicationTableMenu from "./ApplicationTableMenus/ApplicationTableMenu";

type Props = {
  application: ServiceIdDto;
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
        <ApplicationTableMenu fetchData={fetchData}></ApplicationTableMenu>
      </Td>
    </Tr>
  );
};
export default ApplicationTableItem;
