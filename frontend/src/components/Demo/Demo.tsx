import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useReducer } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genExampleClient } from "services/backend/apiClients";
import {
  CreateExampleChildCommand,
  ExampleEnum,
  IExampleChildIdDto
} from "services/backend/nswagts";
import { logger } from "utils/logger";

import styles from "./styles.module.css";

const Demo: FC = () => {
  const [children, dispatchChildren] = useReducer(ListReducer<IExampleChildIdDto>("id"), []);

  const { route } = useRouter();
  const { t, locale, localeNameMap } = useLocales();
  const { menuBg, hoverBg, activeBg } = useColors();

  const fetchData = useCallback(async () => {
    try {
      const exampleClient = await genExampleClient();
      const data = await exampleClient.getAllChildren();

      if (data && data.length > 0)
        dispatchChildren({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  const addNewData = useCallback(async () => {
    const exampleClient = await genExampleClient();
    await exampleClient.createChild(
      new CreateExampleChildCommand({
        child: {
          name: Date.now().toString(32),
          parentId: 1,
          type: ExampleEnum.Middle
        }
      })
    );
    await fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container>
      <Heading className={styles.title}>{t("example.title")}</Heading>
      <Text>{t("example.byLine")}</Text>

      <pre data-testid="data" data-value={children.length}>
        {children.map(dat => (
          <div key={dat.id}>
            {t("example.dataLine", {
              id: dat.id,
              type: dat.type
            })}
          </div>
        ))}
      </pre>
      <pre>
        {localeNameMap &&
          Object.entries(localeNameMap).map(([id, name]) => (
            <Link key={id} href={route} locale={id} passHref>
              <Box
                p={2}
                m={2}
                bgColor={id === locale ? activeBg : menuBg}
                cursor="pointer"
                _hover={{
                  bgColor: hoverBg
                }}>
                <a>{name}</a>
              </Box>
            </Link>
          ))}
      </pre>
      <Button colorScheme="green" data-testid="addNewBtn" onClick={addNewData}>
        {t("example.actions.addNew")}
      </Button>
    </Container>
  );
};

export default Demo;
