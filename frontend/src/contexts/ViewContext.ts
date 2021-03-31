import { createContext, Dispatch, SetStateAction } from "react";
import {
  IApplicationIdDto,
  IApplicationOwnerIdDto,
  IAppTokenIdDto,
  IServiceIdDto
} from "services/backend/nswagts";

type ContextType = {
  applications: IApplicationIdDto[];
  services: IServiceIdDto[];
  appTokens: IAppTokenIdDto[];
  appOwners: IApplicationOwnerIdDto[];
  currApplication: IApplicationIdDto;
  setCurrApp: Dispatch<SetStateAction<IApplicationIdDto>>;
  fetchAppOwners: () => Promise<void>;
  fetchApps: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchAppTokens: () => Promise<void>;
};

export const ViewContext = createContext<ContextType>({
  applications: [],
  services: [],
  appTokens: [],
  appOwners: [],
  currApplication: null,
  setCurrApp: null,
  fetchApps: null,
  fetchServices: null,
  fetchAppOwners: null,
  fetchAppTokens: null
});
