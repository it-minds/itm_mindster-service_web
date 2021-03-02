import { Button, Center, Heading, propNames, Wrap } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { Locale } from "i18n/Locale";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { I18nProps } from "next-rosetta";
import React, { FC, useCallback, useEffect, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { ServiceIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const ServiceTable: FC = () => {
  const [data, setData] = useState<ServiceIdDto[]>([]);
  const { t } = useLocales();
  const router = useRouter();

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
        <Heading>{t("example.title")}adwaddwe dwa</Heading>
      </Wrap>
    </Center>
  );
};

export default ServiceTable;
