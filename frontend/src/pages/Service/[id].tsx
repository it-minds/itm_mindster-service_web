import ActionForm from "components/Forms/Action/ActionForm";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";

const IndexPage: NextPage = () => {
  return <ActionForm />;
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;

  const { table = {} } = await import(`../../i18n/${locale}`);
  //const queryId = useRouter().query;

  console.log(table);
  //console.log(queryId);
  return { props: { table } };
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } } // See the "paths" section below
    ],
    fallback: true // See the "fallback" section below
  };
}

export default IndexPage;
