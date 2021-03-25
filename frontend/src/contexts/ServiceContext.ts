import { createContext } from "react";
import { IAppTokenIdDto, IServiceIdDto } from "services/backend/nswagts";

type ContextType = {
  services: IServiceIdDto[];
  fetchData: () => Promise<void>;
  appTokens: IAppTokenIdDto[];
  fetchAppTokens: () => Promise<void>;
};

export const ServiceContext = createContext<ContextType>({
  services: [],
  fetchData: null,
  appTokens: [],
  fetchAppTokens: null
});
