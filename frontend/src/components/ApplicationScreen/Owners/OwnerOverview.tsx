import { Box, Center, Heading, Tag, Wrap } from "@chakra-ui/react";
import { ViewContext } from "contexts/ViewContext";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationOwnerIdDto, IApplicationIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const OwnerOverview: FC = () => {
  const { appOwners, currApplication } = useContext(ViewContext);

  // const fetchAppOwners = useCallback(async () => {
  //   try {
  //     const client = await genApplicationClient();
  //     const data = await client.getApplicationOwnersByAppId(currApplication.id);

  //     if (data && data.length > 0) setappOwners(data);
  //     else logger.info("exampleClient.get no data");
  //   } catch (err) {
  //     logger.warn("exampleClient.get Error", err);
  //   }
  // }, [currApplication]);

  // useEffect(() => {
  //   fetchAppOwners();
  // }, [fetchAppOwners, currApplication]);

  if (currApplication == null) return null;
  return (
    <>
      <Heading size="h4">Application Owners:</Heading>
      {appOwners.map((owner: ApplicationOwnerIdDto) => (
        <Tag m="5px" colorScheme="facebook" key={owner.id}>
          {owner.email}
        </Tag>
      ))}
    </>
  );
};

export default OwnerOverview;
