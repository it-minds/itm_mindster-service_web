import { createContext, Dispatch, SetStateAction } from "react";
import {
  ActionApproverIdDto,
  IAppTokenIdDto,
  IServiceIdDto,
  IServiceOwnerIdDto
} from "services/backend/nswagts";

type ContextType = {
  services: IServiceIdDto[];
  appTokens: IAppTokenIdDto[];
  serviceOwners: IServiceOwnerIdDto[];
  currService: IServiceIdDto;
  setCurrService: Dispatch<SetStateAction<IServiceIdDto>>;
  fetchUpdatedService: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchOwners: () => Promise<void>;
  fetchAppTokens: () => Promise<void>;
  fetchActionApprovers: (actionId: number) => Promise<ActionApproverIdDto[]>;
};

export const ServiceViewContext = createContext<ContextType>({
  services: [],
  appTokens: [],
  serviceOwners: [],
  currService: null,
  setCurrService: null,
  fetchUpdatedService: null,
  fetchServices: null,
  fetchOwners: null,
  fetchAppTokens: null,
  fetchActionApprovers: null
});
