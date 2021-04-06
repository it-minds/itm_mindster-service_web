import { Box, VStack } from "@chakra-ui/layout";
import ServiceHeader from "components/ServiceScreen/ServiceHeader";
import ServiceInfo from "components/ServiceScreen/ServiceInfo";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { NextPage } from "next";
import { useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import { IAppTokenIdDto, IServiceIdDto, IServiceOwnerIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const ServiceScreen: NextPage = () => {
  const [services, dispatchServices] = useReducer(ListReducer<IServiceIdDto>("id"), []);
  const [appTokens, dispatchAppTokens] = useReducer(ListReducer<IAppTokenIdDto>("id"), []);
  const [serviceOwners, dispatchServiceOwners] = useReducer(
    ListReducer<IServiceOwnerIdDto>("id"),
    []
  );
  const [currService, setCurrService] = useState<IServiceIdDto>();

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
        await dispatchServices({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }

    if (currService != null || currService != undefined) {
      const updatedService = services.find(e => e.id == currService.id);
      console.log("updated Service");
      console.log(updatedService);
      setCurrService(updatedService);
      console.log(currService);
    }
  }, []);

  const fetchUpdatedServices = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getServiceById(currService.id);

      if (data) setCurrService(data);
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, [currService]);

  const fetchServiceOwners = useCallback(async () => {
    try {
      const client = await genServiceClient();
      const data = await client.getServiceOwnersByServiceId(currService.id);

      if (data && data.length > 0)
        dispatchServiceOwners({
          type: ListReducerActionType.Reset,
          data
        });
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, [currService]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    fetchServiceOwners();
  }, [fetchServiceOwners, currService]);

  return (
    <ServiceViewContext.Provider
      value={{
        services: services,
        appTokens: appTokens,
        serviceOwners: serviceOwners,
        currService: currService,
        setCurrService: setCurrService,
        fetchAppTokens: fetchAppTokens,
        fetchUpdatedService: fetchUpdatedServices,
        fetchOwners: fetchServiceOwners,
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

export default ServiceScreen;
