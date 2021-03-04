import { Center, Heading, Wrap } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC } from "react";

const ServiceForm: FC = () => {
  const { t } = useLocales();

  return (
    <Center>
      <Wrap width="700px" justify="center">
        <Heading>{t("example.title")}</Heading>
      </Wrap>
    </Center>
  );
};
export default ServiceForm;
