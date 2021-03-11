import { createContext } from "react";
import { IServiceIdDto } from "services/backend/nswagts";

type ContextType = {
  services: IServiceIdDto[];
  fetchData: () => Promise<void>;
};

export const ServiceContext = createContext<ContextType>({
  services: [],
  fetchData: null
});
