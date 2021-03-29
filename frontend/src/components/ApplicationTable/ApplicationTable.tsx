import { Center, Heading, Table, Tbody, Th, Thead, Tr, Wrap } from "@chakra-ui/react";
import { ApplicationContext } from "contexts/ApplicationContext";
import { FC, useContext } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

import ApplicationTableItem from "./ApplicationTableItem";
import ApplicationTableMenu from "./ApplicationTableMenus/ApplicationTableMenu";
import OwnerOverview from "./Owners/OwnerOverview";

const ApplicationTable: FC = () => {
  const { applications } = useContext(ApplicationContext);

  return (
    <Center>
      <Wrap width="700px" justify="center">
        <Heading>Applications</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>
                <ApplicationTableMenu></ApplicationTableMenu>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {applications.map((application: ApplicationIdDto) => (
              <ApplicationTableItem
                key={application.id}
                application={application}></ApplicationTableItem>
            ))}
          </Tbody>
        </Table>
        <Heading>Add a new owner to your application</Heading>
        <OwnerOverview></OwnerOverview>
      </Wrap>
    </Center>
  );
};

export default ApplicationTable;
