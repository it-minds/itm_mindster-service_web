import { Center, Heading, Table, Tbody, Th, Thead, Tr, Wrap } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import ApplicationTableItem from "./ApplicationTableItem";
import ApplicationTableMenu from "./ApplicationTableMenus/ApplicationTableMenu";

const ApplicationTable: FC = () => {
  const [tableData, setData] = useState<ApplicationIdDto[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const applicationClient = await genApplicationClient();
      const data = await applicationClient.getAllApplications();

      if (data && data.length > 0) setData(data);
      else logger.info("ApplicationClient.get no data");
    } catch (err) {
      logger.warn("ApplicationClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                <ApplicationTableMenu fetchData={fetchData}></ApplicationTableMenu>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((application: ApplicationIdDto) => (
              <ApplicationTableItem
                key={application.id}
                application={application}
                fetchData={fetchData}></ApplicationTableItem>
            ))}
          </Tbody>
        </Table>
      </Wrap>
    </Center>
  );
};

export default ApplicationTable;
