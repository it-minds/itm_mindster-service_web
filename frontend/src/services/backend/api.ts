/* istanbul ignore file */
import { getAuthToken } from "hooks/useAuth";
import fetch from "isomorphic-unfetch";
import { GetServerSidePropsContext } from "next";
import isomorphicEnvSettings, { setEnvSettings } from "utils/envSettings";

// !NOTE: If you are having build errors with this file missing, the backend is required to be built first
import { AuthBase } from "./nswagts";

type BaseConstructor<T> = {
  new (
    configuration: AuthBase,
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ): T;
};

export const api = async <T, U extends BaseConstructor<T>>(
  Client: U,
  context?: GetServerSidePropsContext
): Promise<T> => {
  let envSettings = isomorphicEnvSettings();

  if (envSettings === null && process.browser) {
    envSettings = await fetch("/api/getEnv").then(res => res.json());
    setEnvSettings(envSettings);
  }
  if (envSettings === null && !process.browser) {
    throw new Error("Environment settings null on server");
  }

  const authToken = getAuthToken(context) ?? "";
  const initilizedClient = new Client(new AuthBase(authToken), envSettings.backendUrl, {
    fetch
  });

  return initilizedClient;
};
