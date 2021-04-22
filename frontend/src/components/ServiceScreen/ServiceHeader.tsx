import { Box, Button, Flex, Image, Spacer, Wrap } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
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
      <Box alignContent="end" justifyContent="right">
        <Link href="/ApplicationScreen">
          <Button rightIcon={<BsArrowRight />} colorScheme="purple">
            Enter as Application Owner
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default ServiceHeader;
