
import ActionForm from "components/Forms/Action/ActionForm";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { genServiceClient } from "services/backend/apiClients";
import { ServiceIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const IndexPage: NextPage = () => {
  return <ActionForm serviceId={1} />;
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;

  const { table = {} } = await import(`../../i18n/${locale}`);

  return { props: { table } };
};

export async function getStaticPaths() {
  // let data: ServiceIdDto[] = [];

  // try {
  //   const serviceClient = await genServiceClient();
  //   data = await serviceClient.getAllServices();
  // } catch (err) {
  //   logger.warn("todoItemClient.get Error", err);
  //   console.log("failed fetch");
  // }

  // const paths = data.map((Service: ServiceIdDto) => `/Service/${Service.id}`);

  // GetstaticPaths currently doenst work as i want it. The above code gives the
  // following error
  //   {"message":"isomorphicEnvSettings - isBrowser","args":[false]}
  // {"message":"todoItemClient.get Error","args":[{"message":"request to https://localhost:5001/api/Service failed, reason: unable to verify the first certificate","type":"system","errno":"UNABLE_TO_VERIFY_LEAF_SIGNATURE","code":"UNABLE_TO_VERIFY_LEAF_SIGNATURE"}]}
  return {
    paths: [
      { params: { locale: "", id: "1" } },
      { params: { locale: "en-US", id: "1" } },
      { params: { id: "2" } } // See the "paths" section below
    ],
    fallback: true // See the "fallback" section below
  };
}

export default IndexPage;
