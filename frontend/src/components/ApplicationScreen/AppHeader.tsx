import { Box, Button, Flex, Image, Spacer } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import ColorModeToggler from "components/Common/ColorModeToggler";
import Link from "next/link";
import { FC } from "react";

import SelectAppTriggerBtn from "./Application/SelectAppTriggerBtn";

const AppHeader: FC = () => {
  return (
    <Flex p="2" bgColor="purple.500" align="center" width="full">
      <Box borderWidth="1px" rounded="full" borderColor="black">
        <Image boxSize="50" src="/images/icons/icon-144x144.png" />
      </Box>
      <Box ml="2">
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
