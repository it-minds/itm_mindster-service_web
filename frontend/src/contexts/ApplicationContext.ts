import { createContext } from "react";
import { IApplicationIdDto } from "services/backend/nswagts";

type ContextType = {
  applications: IApplicationIdDto[];
  fetchData: () => Promise<void>;
};

export const ApplicationContext = createContext<ContextType>({
  applications: [],
  fetchData: null
});
