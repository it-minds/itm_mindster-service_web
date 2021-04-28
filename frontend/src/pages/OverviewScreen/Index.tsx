import { Box, Center, Container, Flex, SimpleGrid } from "@chakra-ui/layout";
import OverviewHeader from "components/OverviewScreen/OverviewHeader";
import OverviewTable from "components/OverviewScreen/OverviewTable";
import { OverviewScreenContext } from "contexts/OverviewScreenContext";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useReducer } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import { IAppOverviewDto, IServiceOverviewDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const OverviewScreen: NextPage = () => {
  const [applications, dispatchApplications] = useReducer(ListReducer<IAppOverviewDto>("id"), []);
  const [services, dispatchServices] = useReducer(ListReducer<IServiceOverviewDto>("id"), []);

  const fetchApps = useCallback(async () => {
    try {
      const applicationClient = await genApplicationClient();
      const data = await applicationClient.getAllMyApplicationsOverview();

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

  const fetchServices = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getMyServicesOverview();

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

  return (
    <OverviewScreenContext.Provider
      value={{
        applications: applications,
        services: services,
        fetchApps: fetchApps,
        fetchServices: fetchServices
      }}>
      <Flex h="100vh" maxW="unset" direction="column">
        <OverviewHeader />
        <Center>
          <Container pt="20px" w="6xl" maxW="unset">
            <SimpleGrid
              w="full"
              align="left"
              columns={2}
              minChildWidth="300px"
              spacingX="40px"
              spacingY="20px">
              <Box>
                <OverviewTable tableData={applications} tableHeading="Applications" />
              </Box>
              <Box>
                <OverviewTable tableData={services} tableHeading="Services" />
              </Box>
            </SimpleGrid>
          </Container>
        </Center>
      </Flex>
    </OverviewScreenContext.Provider>
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

export default OverviewScreen;