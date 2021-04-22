import { Box, Button, Flex, Image, Spacer } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import ColorModeToggler from "components/Common/ColorModeToggler";
import Link from "next/link";
import { FC } from "react";

import SelectServiceTriggerBtn from "./Service/SelectServiceTriggerBtn";

const ServiceHeader: FC = () => {
  return (
    <Flex p="2" bgColor="orange.400" align="center" width="full">
      <Box borderWidth="1px" rounded="full" borderColor="black">
        <Image boxSize="50px" src="/images/icons/icon-144x144.png" />
      </Box>
      <Box ml="2">
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
