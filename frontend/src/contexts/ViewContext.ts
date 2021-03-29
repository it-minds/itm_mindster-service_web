import { createContext, Dispatch, SetStateAction } from "react";
import { IApplicationIdDto, IAppTokenIdDto, IServiceIdDto } from "services/backend/nswagts";

type ContextType = {
  applications: IApplicationIdDto[];
  services: IServiceIdDto[];
  appTokens: IAppTokenIdDto[];
  currApplication: IApplicationIdDto;
  setCurrApp: Dispatch<SetStateAction<IApplicationIdDto>>;

  fetchApps: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchAppTokens: () => Promise<void>;
};

export const ViewContext = createContext<ContextType>({
  applications: [],
  services: [],
  appTokens: [],
  currApplication: null,
  setCurrApp: null,
  fetchApps: null,
  fetchServices: null,
  fetchAppTokens: null
});
