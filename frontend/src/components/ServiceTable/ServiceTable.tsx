import { Center, Heading, Table, Tbody, Th, Thead, Tr, Wrap } from "@chakra-ui/react";
import ServiceTableMenu from "components/ServiceTable/ServiceTableMenus/ServiceTableMenu";
import { ServiceContext } from "contexts/ServiceContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import ServiceTableItem from "./ServiceTableItem";

const ServiceTable: FC = () => {
  const { services } = useContext(ServiceContext);

  const { t } = useLocales();

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
            {services.map((Service: ServiceIdDto) => (
              <ServiceTableItem key={Service.id} service={Service}></ServiceTableItem>
            ))}
          </Tbody>
        </Table>
      </Wrap>
    </Center>
  );
};

export default ServiceTable;
