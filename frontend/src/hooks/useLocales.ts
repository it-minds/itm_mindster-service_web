import "ts-array-ext/reduceAsync";

import { Locale } from "i18n/Locale";
import { useRouter } from "next/router";
import { useI18n } from "next-rosetta";
import { useState } from "react";

import { useEffectAsync } from "./useEffectAsync";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLocales = () => {
  const [localeNameMap, setLocaleNameMap] = useState<Record<string, string>>();
  const { locale, locales } = useRouter();

  const { t } = useI18n<Locale>();

  useEffectAsync(async () => {
    const localeNameMap = await locales.reduceAsync<Record<string, string>>(async (acc, cur) => {
      const localeFile = await require("../i18n/" + cur);

      acc[cur] = (localeFile.table as Locale).locale;

      return acc;
    }, {});

    setLocaleNameMap(localeNameMap);
  }, []);

  return { t, locale, locales, localeNameMap };
};
