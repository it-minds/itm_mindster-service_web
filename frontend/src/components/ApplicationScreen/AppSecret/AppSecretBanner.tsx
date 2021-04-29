import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { FC } from "react";

import GenerateAppSecretTriggerBtn from "./GenerateAppSecretTriggerBtn";

const AppSecretBanner: FC = () => {
  const { appSecretBannerBg } = useColors();
  return (
    <Box w="full" as="section" pb="12">
      <Stack
        direction={{ base: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        py="3"
        px={{ base: "3", md: "6", lg: "8" }}
        color="white"
        bg={appSecretBannerBg}>
        <HStack spacing="3">
          <Text fontWeight="medium" marginEnd="2">
            You have not generated your AppSecret for this Application. This is required to generate
            your AppTokens and JWT
          </Text>
        </HStack>
        <GenerateAppSecretTriggerBtn />
      </Stack>
    </Box>
  );
};

export default AppSecretBanner;
