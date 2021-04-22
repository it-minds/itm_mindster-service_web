import { createContext } from "react";
import { IApplicationIdDto, IServiceIdDto } from "services/backend/nswagts";

type ContextType = {
  applications: IApplicationIdDto[];
  services: IServiceIdDto[];
  fetchApps: () => Promise<void>;
  fetchServices: () => Promise<void>;
};

export const OverviewScreenContext = createContext<ContextType>({
  applications: [],
  services: [],
  fetchApps: null,
  fetchServices: null
});
