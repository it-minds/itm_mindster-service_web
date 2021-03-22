import { createContext, Dispatch, SetStateAction } from "react";
import { IApplicationIdDto, IAppTokenIdDto, IServiceIdDto } from "services/backend/nswagts";

type ContextType = {
  applications: IApplicationIdDto[];
  services: IServiceIdDto[];
  appTokens: IAppTokenIdDto[];
  currToken: IAppTokenIdDto;
  setCurrToken: Dispatch<SetStateAction<IAppTokenIdDto>>;
  fetchApps: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchAppTokens: () => Promise<void>;
};

export const ApplicationContext = createContext<ContextType>({
  applications: [],
  services: [],
  appTokens: [],
  currToken: null,
  setCurrToken: null,
  fetchApps: null,
  fetchServices: null,
  fetchAppTokens: null
});
