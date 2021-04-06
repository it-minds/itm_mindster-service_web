import { Box, Button, Flex, Image, Spacer, Wrap } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import Link from "next/link";
import { FC } from "react";

import SelectAppTriggerBtn from "./Application/SelectAppTriggerBtn";

const AppHeader: FC = () => {
  return (
    <Wrap p="5" bgColor="purple.500" width="full">
      <Flex align="center" width="full">
        <Box>
          <Image borderRadius="full" boxSize="50px" src="/images/icons/icon-144x144.png" />
        </Box>

        <Box m="5" w="max-content">
          <SelectAppTriggerBtn></SelectAppTriggerBtn>
        </Box>

        <Spacer />
        <Box alignContent="end" justifyContent="right">
          <Link href="/ServiceScreen">
            <Button
              rightIcon={<BsArrowRight />}
              borderWidth="1px"
              borderColor="black"
              bgColor="orange">
              Enter as Service Provider
            </Button>
          </Link>
        </Box>
      </Flex>
    </Wrap>
  );
};

export default AppHeader;
