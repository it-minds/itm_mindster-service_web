import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import ColorModeToggler from "components/Common/ColorModeToggler";
import MLogo from "components/Common/MLogo";
import { useColors } from "hooks/useColors";
import Link from "next/link";
import { FC } from "react";

import SelectServiceTriggerBtn from "./Service/SelectServiceTriggerBtn";

const ServiceHeader: FC = () => {
  const { serviceHeaderBg } = useColors();

  return (
    <Flex h="70px" pl="50px" pr="50px" bgColor={serviceHeaderBg} align="center" width="full">
      <MLogo />
      <Box ml="2px">
        <SelectServiceTriggerBtn />
      </Box>
      <Spacer />
      <ColorModeToggler />
      <Box ml="2px" alignContent="end" justifyContent="right">
        <Link href="/ApplicationScreen">
          <Button rightIcon={<BsArrowRight />} colorScheme="purple">
            Application Page
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default ServiceHeader;
