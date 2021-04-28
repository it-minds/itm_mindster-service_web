import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import ColorModeToggler from "components/Common/ColorModeToggler";
import MLogo from "components/Common/MLogo";
import { useColors } from "hooks/useColors";
import Link from "next/link";
import { FC } from "react";

import SelectAppTriggerBtn from "./Application/SelectAppTriggerBtn";

const AppHeader: FC = () => {
  const { appHeaderBg } = useColors();
  return (
    <Flex h="70px" pl="50px" pr="50px" bgColor={appHeaderBg} align="center" width="full">
      <MLogo />
      <Box ml="2px">
        <SelectAppTriggerBtn />
      </Box>
      <Spacer />
      <ColorModeToggler />
      <Box ml="2px" alignContent="end" justifyContent="right">
        <Link href="/ServiceScreen">
          <Button rightIcon={<BsArrowRight />} colorScheme="yellow">
            Service Page
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default AppHeader;
