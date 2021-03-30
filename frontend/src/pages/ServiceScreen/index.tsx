import { Box, VStack } from "@chakra-ui/layout";
import ServiceHeader from "components/ServiceScreen/Header";
import ServiceInfo from "components/ServiceScreen/ServiceInfo";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import { IAppTokenIdDto, IServiceIdDto, ServiceIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const ServiceScreen: NextPage = () => {
  const [services, dispatchServices] = useReducer(ListReducer<IServiceIdDto>("id"), []);
  const [appTokens, dispatchAppTokens] = useReducer(ListReducer<IAppTokenIdDto>("id"), []);
  const [currService, setCurrService] = useState<ServiceIdDto>();

  const fetchAppTokens = useCallback(async () => {
    try {
      const client = await genApplicationClient();
      const data = await client.getAllAppTokens(true);

      if (data && data.length >= 0) {
        dispatchAppTokens({
          type: ListReducerActionType.Reset,
          data
        });
        console.log(appTokens);
      } else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getMyServices();

      if (data && data.length > 0)
        dispatchServices({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <ServiceViewContext.Provider
      value={{
        services: services,
        appTokens: appTokens,
        currService: currService,
        setCurrService: setCurrService,
        fetchAppTokens: fetchAppTokens,
        fetchServices: fetchServices
      }}>
      <VStack>
        <Box zIndex={1} position="fixed" w="full">
          <ServiceHeader />
        </Box>
        <Box pt="100px" borderColor="black" borderWidth="1px" w="full">
          <ServiceInfo />
        </Box>
      </VStack>
    </ServiceViewContext.Provider>
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

export default ServiceScreen;
