import { createContext } from "react";
import { IAppOverviewDto, IServiceOverviewDto } from "services/backend/nswagts";

type ContextType = {
  applications: IAppOverviewDto[];
  services: IServiceOverviewDto[];
  fetchApps: () => Promise<void>;
  fetchServices: () => Promise<void>;
};

export const OverviewScreenContext = createContext<ContextType>({
  applications: [],
  services: [],
  fetchApps: null,
  fetchServices: null
});
