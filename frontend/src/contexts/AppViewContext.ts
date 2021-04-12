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
  currToken: IAppTokenIdDto;
  setCurrApp: Dispatch<SetStateAction<IApplicationIdDto>>;
  setCurrToken: Dispatch<SetStateAction<IAppTokenIdDto>>;
  fetchAppOwners: () => Promise<void>;
  fetchApps: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchAppTokens: () => Promise<void>;
};

export const AppViewContext = createContext<ContextType>({
  applications: [],
  services: [],
  appTokens: [],
  appOwners: [],
  currApplication: null,
  currToken: null,
  setCurrApp: null,
  setCurrToken: null,
  fetchApps: null,
  fetchServices: null,
  fetchAppOwners: null,
  fetchAppTokens: null
});
