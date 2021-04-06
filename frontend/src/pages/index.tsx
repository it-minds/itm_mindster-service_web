import { Center, Container } from "@chakra-ui/layout";
import MarkdownTwoInOne from "components/Markdown/MarkdownTwoInOne";
import MarkdownTwoSplit from "components/Markdown/MarkdownTwoSplit";
import { Locale } from "i18n/Locale";
// import { runTimeTable } from "i18n/runtimeTable";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";

import React, { useState } from "react";

const IndexPage: NextPage = () => {
  const [value, setValue] = useState("# My Service\n");
  return (
    <Center>
      <Container w="5xl" maxW="unset">
        {/* <MarkdownTwoInOne
          value={value}
          onValueChange={setValue}
          onSave={(x, y) => Promise.resolve(alert(y))}
        /> */}

        <MarkdownTwoSplit
          value={value}
          onValueChange={setValue}
          onSave={(x, y) => Promise.resolve(alert(y))}
        />
      </Container>
    </Center>
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
