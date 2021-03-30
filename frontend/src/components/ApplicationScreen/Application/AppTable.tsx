import { Center, Table, Tbody, Th, Thead, Tr, Wrap } from "@chakra-ui/react";
import { ViewContext } from "contexts/ViewContext";
import { FC, useContext } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

import AppTableItem from "./AppTableItem";

const AppTable: FC = () => {
  const { applications } = useContext(ViewContext);

  return (
    <Table size="sm" variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th w={0.49}>Name</Th>
          <Th w={0.49}>ID</Th>
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
