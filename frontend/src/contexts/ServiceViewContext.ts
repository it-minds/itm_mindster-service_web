import { createContext, Dispatch, SetStateAction } from "react";
import { IAppTokenIdDto, IServiceIdDto } from "services/backend/nswagts";

type ContextType = {
  services: IServiceIdDto[];
  appTokens: IAppTokenIdDto[];
  currService: IServiceIdDto;
  setCurrService: Dispatch<SetStateAction<IServiceIdDto>>;
  fetchServices: () => Promise<void>;
  fetchAppTokens: () => Promise<void>;
};

export const ServiceViewContext = createContext<ContextType>({
  services: [],
  appTokens: [],
  currService: null,
  setCurrService: null,
  fetchServices: null,
  fetchAppTokens: null
});
