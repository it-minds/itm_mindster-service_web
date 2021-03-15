import ApplicationTable from "components/ApplicationTable/ApplicationTable";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import { ApplicationContext } from "../../contexts/ApplicationContext";

const IndexPage: NextPage = () => {
  const [applications, setApplications] = useState<ApplicationIdDto[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const applicationClient = await genApplicationClient();
      const data = await applicationClient.getAllApplications();

      if (data && data.length > 0) setApplications(data);
      else logger.info("ApplicationClient.get no data");
    } catch (err) {
      logger.warn("ApplicationClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ApplicationContext.Provider
      value={{
        applications: applications,
        fetchData: fetchData
      }}>
      <ApplicationTable />
    </ApplicationContext.Provider>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;

  const { table = {} } = await import(`../../i18n/${locale}`);

  console.log(table);
  return { props: { table } };
};

export default IndexPage;
