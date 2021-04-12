import { Box, VStack } from "@chakra-ui/layout";
import AppHeader from "components/ApplicationScreen/AppHeader";
import ApplicationInfo from "components/ApplicationScreen/ApplicationInfo";
import { AppViewContext } from "contexts/AppViewContext";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import {
  ApplicationIdDto,
  IApplicationIdDto,
  IApplicationOwnerIdDto,
  IAppTokenIdDto,
  IServiceIdDto
} from "services/backend/nswagts";
import { logger } from "utils/logger";

const IndexPage: NextPage = () => {
  const [applications, dispatchApplications] = useReducer(ListReducer<IApplicationIdDto>("id"), []);
  const [services, dispatchServices] = useReducer(ListReducer<IServiceIdDto>("id"), []);
  const [appTokens, dispatchAppTokens] = useReducer(ListReducer<IAppTokenIdDto>("id"), []);
  const [appOwners, dispatchAppOwners] = useReducer(ListReducer<IApplicationOwnerIdDto>("id"), []);
  const [currApplication, setCurrApp] = useState<ApplicationIdDto>();
  const [currToken, setCurrToken] = useState<IAppTokenIdDto>();

  const fetchApps = useCallback(async () => {
    try {
      const applicationClient = await genApplicationClient();
      const data = await applicationClient.getAllApplications();

      if (data && data.length > 0)
        dispatchApplications({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("ApplicationClient.getAllApps got no data");
    } catch (err) {
      logger.warn("ApplicationClient.getAllApps Error", err);
    }
  }, []);

  const fetchAppTokens = useCallback(async () => {
    try {
      const client = await genApplicationClient();
      const data = await client.getAppTokensByAppId(currApplication.id);

      if (data && data.length >= 0) {
        dispatchAppTokens({
          type: ListReducerActionType.Reset,
          data
        });
      } else logger.info("ApplicationClient.getAppTokensByAppId got no data");
    } catch (err) {
      logger.warn("ApplicationClient.getAppTokensByAppId Error", err);
    }
  }, [currApplication]);

  const fetchAppOwners = useCallback(async () => {
    try {
      const client = await genApplicationClient();
      const data = await client.getApplicationOwnersByAppId(currApplication.id);

      if (data && data.length > 0)
        dispatchAppOwners({
          type: ListReducerActionType.Reset,
          data
        });
      else logger.info("ApplicationClient.getApplicationsOwnersByAppId got no data");
    } catch (err) {
      logger.warn("ApplicationClient.getApplicationsOwnersByAppId Error", err);
    }
  }, [currApplication]);

  const fetchServices = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getAllServices();

      if (data && data.length > 0)
        dispatchServices({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("ServiceClient.GetAllServices got no data");
    } catch (err) {
      logger.warn("ServiceClient.GetAllServices Error", err);
    }
  }, []);

  useEffect(() => {
    fetchApps();
    fetchServices();
  }, [fetchApps, fetchServices]);

  useEffect(() => {
    if (currApplication) {
      fetchAppOwners();
      fetchAppTokens();
    }
  }, [fetchAppOwners, fetchAppTokens, currApplication]);

  return (
    <AppViewContext.Provider
      value={{
        applications: applications,
        services: services,
        appTokens: appTokens,
        appOwners: appOwners,
        currApplication: currApplication,
        currToken: currToken,
        setCurrApp: setCurrApp,
        setCurrToken: setCurrToken,
        fetchApps: fetchApps,
        fetchAppTokens: fetchAppTokens,
        fetchServices: fetchServices,
        fetchAppOwners: fetchAppOwners
      }}>
      <VStack>
        <Box zIndex={1} position="fixed" w="full">
          <AppHeader></AppHeader>
        </Box>
        <Box pt="100px" borderColor="black" borderWidth="1px" w="full">
          <ApplicationInfo></ApplicationInfo>
        </Box>
      </VStack>
    </AppViewContext.Provider>
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
