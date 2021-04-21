import { Box, Button, Flex, Image, Spacer, Wrap } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import Link from "next/link";
import { FC } from "react";

import SelectServiceTriggerBtn from "./Service/SelectServiceTriggerBtn";

const ServiceHeader: FC = () => {
  return (
    <Wrap p="5" bgColor="#FF9800" width="full">
      <Flex align="center" width="full">
        <Box>
          <Image borderRadius="full" boxSize="50px" src="/images/icons/icon-144x144.png" />
        </Box>
        <Box m="5" w="max-content">
          <SelectServiceTriggerBtn />
        </Box>
        <Spacer />
        <Box alignContent="end" justifyContent="right">
          <Link href="/ApplicationScreen">
            <Button
              rightIcon={<BsArrowRight />}
              borderWidth="1px"
              borderColor="black"
              bgColor="purple.600">
              Enter as Application Owner
            </Button>
          </Link>
        </Box>
      </Flex>
    </Wrap>
  );
};

export default ServiceHeader;
