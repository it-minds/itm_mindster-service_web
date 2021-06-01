import { Locale } from "i18n/Locale";
// import { runTimeTable } from "i18n/runtimeTable";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import React, { useState } from "react";

import OverviewScreen from "./OverviewScreen/Index";

const IndexPage: NextPage = () => {
  const [value, setValue] = useState("# My Service\n");
  return (
    //     <MarkdownTwoInOne
    //   value={value}
    //   onValueChange={setValue}
    //   onSave={(x, y) => Promise.resolve(alert(y))}
    // />

    // <MarkdownTwoSplit
    //   value={value}
    //   onValueChange={setValue}
    //   onSave={(x, y) => Promise.resolve(alert(y))}
    // />
    <OverviewScreen />
  );
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../i18n/${locale}`);
  // table = await runTimeTable(locale, table);

  return {
    props: { table }
  };
};

export default IndexPage;
