import { Center, Heading, Table, Tbody, Th, Thead, Tr, Wrap } from "@chakra-ui/react";
import ServiceTableMenu from "components/ServiceTable/ServiceTableMenus/ServiceTableMenu";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useEffect, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { ServiceIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import ServiceTableItem from "./ServiceTableItem";

const ServiceTable: FC = () => {
  const [tableData, setData] = useState<ServiceIdDto[]>([]);

  const { t } = useLocales();

  const fetchData = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getAllServices();

      if (data && data.length > 0) setData(data);
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Center>
      <Wrap width="700px" justify="center">
        <Heading>{t("example.title")}</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>State</Th>
              <Th>
                <ServiceTableMenu></ServiceTableMenu>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((Service: ServiceIdDto) => (
              <ServiceTableItem key={Service.id} service={Service}></ServiceTableItem>
            ))}
          </Tbody>
        </Table>
      </Wrap>
    </Center>
  );
};

export default ServiceTable;
