import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { FC, useContext } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

import AppTableItem from "./AppTableItem";

const AppTable: FC = () => {
  const { applications } = useContext(AppViewContext);

  return (
    <Table size="sm" variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th w={0.49}>Name</Th>
          <Th w={0.49}>Identifier</Th>
        </Tr>
      </Thead>
      <Tbody>
        {applications.map((application: ApplicationIdDto) => (
          <AppTableItem key={application.id} application={application}></AppTableItem>
        ))}
      </Tbody>
    </Table>
  );
};

export default AppTable;
