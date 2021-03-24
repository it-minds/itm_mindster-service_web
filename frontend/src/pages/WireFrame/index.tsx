import { Box, VStack } from "@chakra-ui/layout";
import ApplicationInfo from "components/WireFrameScreen/ApplicationInfo";
import Header from "components/WireFrameScreen/Header";
import { ViewContext } from "contexts/ViewContext";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useState } from "react";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import { ApplicationIdDto, AppTokenIdDto, ServiceIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const IndexPage: NextPage = () => {
  const [applications, setApplications] = useState<ApplicationIdDto[]>([]);
  const [services, setServices] = useState<ServiceIdDto[]>([]);
  const [appTokens, setAppTokens] = useState<AppTokenIdDto[]>([]);
  const [currApplication, setCurrApp] = useState<ApplicationIdDto>();

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
    <ViewContext.Provider
      value={{
        applications: applications,
        services: services,
        appTokens: appTokens,
        currApplication: currApplication,
        setCurrApp: setCurrApp,
        fetchApps: fetchApps,
        fetchAppTokens: fetchAppTokens,
        fetchServices: fetchServices
      }}>
      <VStack borderColor="black" borderWidth="1px">
        <Box w="full">
          <Header></Header>
        </Box>
        <Box w="full">
          <ApplicationInfo></ApplicationInfo>
        </Box>
      </VStack>
    </ViewContext.Provider>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../../i18n/${locale}`);
  // table = await runTimeTable(locale, table);

  return {
    props: { table }
  };
};

export default IndexPage;
