import { GetServerSidePropsContext } from "next";

import { api } from "./api";
import { AuthClient, ExampleChildClient, ServiceClient } from "./nswagts";

export const genExampleClient = (
  context?: GetServerSidePropsContext
): Promise<ExampleChildClient> => api(ExampleChildClient, context);

export const genServiceClient = (context?: GetServerSidePropsContext): Promise<ServiceClient> =>
  api(ServiceClient, context);

export const genAuthenticationClient = (context?: GetServerSidePropsContext): Promise<AuthClient> =>
  api(AuthClient, context);
