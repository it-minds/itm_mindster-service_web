import { Box, Flex, Image, Wrap } from "@chakra-ui/react";
import ColorModeToggler from "components/Common/ColorModeToggler";
import { FC } from "react";

const OverviewHeader: FC = () => {
  return (
    <Wrap p="2" bgColor="blue.400" width="full">
      <Flex align="center" width="full">
        <Box mr="2px" rounded="full" borderWidth="1px" borderColor="black">
          <Image boxSize="50px" src="/images/icons/icon-144x144.png" />
        </Box>
        <ColorModeToggler />
      </Flex>
    </Wrap>
  );
};

export default OverviewHeader;
