import ServiceLibrary from "components/ServiceLibrary/ServiceLibrary";
import { ServiceContext } from "contexts/ServiceContext";
import { Locale } from "i18n/Locale";
// import { runTimeTable } from "i18n/runtimeTable";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { ServiceIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const ServiceLibraryPage: NextPage = () => {
  const [serviceEntities, setServiceEntities] = useState<ServiceIdDto[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getAllServices();

      if (data && data.length > 0) setServiceEntities(data);
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <ServiceContext.Provider
      value={{
        services: serviceEntities,
        fetchData: fetchData
      }}>
      <ServiceLibrary />
    </ServiceContext.Provider>
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

export default ServiceLibraryPage;
