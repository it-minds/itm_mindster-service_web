import { Center, HStack } from "@chakra-ui/layout";
import ApplicationTable from "components/ApplicationTable/ApplicationTable";
import AppToken from "components/AppTokens/AppToken";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import { ApplicationIdDto, AppTokenIdDto, ServiceIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import { ApplicationContext } from "../../contexts/ApplicationContext";

const IndexPage: NextPage = () => {
  const [applications, setApplications] = useState<ApplicationIdDto[]>([]);
  const [services, setServices] = useState<ServiceIdDto[]>([]);
  const [appTokens, setAppTokens] = useState<AppTokenIdDto[]>([]);
  const [currToken, setCurrToken] = useState<AppTokenIdDto>();

  const fetchApps = useCallback(async () => {
    try {
      const applicationClient = await genApplicationClient();
      const data = await applicationClient.getAllApplications();

      if (data && data.length > 0) setApplications(data);
      else logger.info("ApplicationClient.get no data");
    } catch (err) {
      logger.warn("ApplicationClient.get Error", err);
    }
  }, []);

  const fetchAppTokens = useCallback(async () => {
    try {
      const client = await genApplicationClient();
      const data = await client.getAllAppTokens(false);

      if (data && data.length > 0) {
        setAppTokens(data);
        // setCurrToken(data[0]);
      } else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getAllServices();

      if (data && data.length > 0) setServices(data);
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchApps();
    fetchAppTokens();
    fetchServices();
  }, [fetchApps]);

  return (
    <ApplicationContext.Provider
      value={{
        applications: applications,
        services: services,
        appTokens: appTokens,
        currToken: currToken,
        setCurrToken: setCurrToken,
        fetchApps: fetchApps,
        fetchAppTokens: fetchAppTokens,
        fetchServices: fetchServices
      }}>
      <Center>
        <HStack spacing="10">
          <ApplicationTable />
          <AppToken />
        </HStack>
      </Center>
    </ApplicationContext.Provider>
  );
};

export default IndexPage;
