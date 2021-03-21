/* istanbul ignore file */
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { genAuthenticationClient } from "services/backend/apiClients";
import isomorphicEnvSettings from "utils/envSettings";

import { useEffectAsync } from "./useEffectAsync";

export enum AuthStage {
  CHECKING,
  AUTHENTICATED,
  UNAUTHENTICATED
}

type AuthHook<T> = {
  authStage: AuthStage;
  login: () => Promise<void>;
  logout: () => void;
  activeUser: T | null;
};

export const useAuth = (): AuthHook<string> => {
  const [authStage, setAuthStage] = useState(AuthStage.CHECKING);
  const [authCounter, setAuthCounter] = useState(0);
  const [activeUser, setActiveUser] = useState<string>(null);
  const router = useRouter();

  useEffectAsync(async () => {
    const auth = router.query[process.env.NEXT_PUBLIC_AUTH_NAME] as string;
    if (auth) {
      console.log("Setting Auth: ", auth);
      setAuthToken(auth);
      delete router.query[process.env.NEXT_PUBLIC_AUTH_NAME];

      const queryStr = Object.entries(router.query)
        .map(x => x.join("="))
        .join("");

      router.replace(`${router.pathname}?${queryStr}`, undefined, {
        shallow: true
      });
    }

    console.log("Checking Auth with :", getAuthToken());

    const client = await genAuthenticationClient();

    const useremail: string = await client.checkAuth().catch(() => null);

    setActiveUser(useremail);
    setAuthStage(useremail ? AuthStage.AUTHENTICATED : AuthStage.UNAUTHENTICATED);
  }, [authCounter, router]);

  const login = useCallback(async () => {
    const client = await genAuthenticationClient();
    const url: string = await client.getLoginUrl();

    const envSettings = isomorphicEnvSettings();
    window.location.href =
      envSettings.backendUrl +
      url +
      "?callback=" +
      window.location.origin +
      "?" +
      process.env.NEXT_PUBLIC_AUTH_NAME +
      "=";
  }, []);

  const logout = useCallback(() => {
    setAuthStage(AuthStage.CHECKING);
    setAuthToken("");
    setAuthCounter(c => c + 1);
    router.push("/");
  }, []);

  return { authStage, login, logout, activeUser };
};

export const getAuthToken = (): string => {
  if (process.browser) return localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_NAME);

  return null;
};

export const setAuthToken = (token: string): void => {
  if (process.browser) return localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_NAME, token);

  return null;
};
