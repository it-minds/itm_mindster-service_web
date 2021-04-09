import { Box, VStack } from "@chakra-ui/layout";
import ServiceHeader from "components/ServiceScreen/ServiceHeader";
import ServiceInfo from "components/ServiceScreen/ServiceInfo";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { NextPage } from "next";
import { useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import {
  IActionApproverIdDto,
  IAppTokenIdDto,
  IServiceIdDto,
  IServiceOwnerIdDto
} from "services/backend/nswagts";
import { logger } from "utils/logger";

const ServiceScreen: NextPage = () => {
  const [services, dispatchServices] = useReducer(ListReducer<IServiceIdDto>("id"), []);
  const [appTokens, dispatchAppTokens] = useReducer(ListReducer<IAppTokenIdDto>("id"), []);
  const [approvers, dispatchApprovers] = useReducer(ListReducer<IActionApproverIdDto>("id"), []);
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
      } else logger.info("ApplicationClient.getAppToken got no data");
    } catch (err) {
      logger.warn("ApplicationClient.getAppToken Error", err);
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
      else logger.info("ServiceClient.getMyServices got no data");
    } catch (err) {
      logger.warn("ServiceClient.getMyServices Error", err);
    }

    if (currService != null || currService != undefined) {
      const updatedService = services.find(e => e.id == currService.id);
      setCurrService(updatedService);
    }
  }, []);

  const fetchUpdatedServices = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getServiceById(currService.id);

      if (data) setCurrService(data);
      else logger.info("ServiceClient.getServiceById got no data");
    } catch (err) {
      logger.warn("ServiceClient.getServiceById Error", err);
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
      else logger.info("ServiceClient.getServiceOwnersByServiceId no data");
    } catch (err) {
      logger.warn("ServiceClient.getServiceOwnersByServiceId Error", err);
    }
  }, [currService]);

  const fetchActionApprovers = useCallback(async () => {
    try {
      const client = await genServiceClient();
      const data = await client.getActionApproversByServiceId(currService.id);

      if (data && data.length > 0) {
        dispatchApprovers({
          type: ListReducerActionType.Reset,
          data
        });
      } else logger.info("ServiceClient.GetActionApproversByServiceId got no data");
    } catch (err) {
      logger.warn("ServiceClient.GetActionApproversByServiceId Error", err);
    }
  }, [currService]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (currService) {
      fetchServiceOwners();
      fetchActionApprovers();
    }
  }, [fetchServiceOwners, fetchActionApprovers, currService]);

  return (
    <ServiceViewContext.Provider
      value={{
        services: services,
        appTokens: appTokens,
        serviceOwners: serviceOwners,
        currService: currService,
        approvers: approvers,
        setCurrService: setCurrService,
        fetchAppTokens: fetchAppTokens,
        fetchUpdatedService: fetchUpdatedServices,
        fetchOwners: fetchServiceOwners,
        fetchServices: fetchServices,
        fetchActionApprovers: fetchActionApprovers
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
