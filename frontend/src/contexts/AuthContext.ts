import { useAuth } from "hooks/useAuth";
import { createContext } from "react";

type ContextType = ReturnType<typeof useAuth>;

export const AuthContext = createContext<ContextType>({
  activeUser: "",
  authStage: 0,
  login: () => null,
  logout: () => null
});
