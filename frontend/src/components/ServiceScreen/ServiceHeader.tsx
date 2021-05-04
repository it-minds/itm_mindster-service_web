import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import ColorModeToggler from "components/Common/ColorModeToggler";
import MLogo from "components/Common/MLogo";
import { useColors } from "hooks/useColors";
import Link from "next/link";
import { FC } from "react";

import NotificationTriggerBtn from "./Notifications/NotificationTriggerbtn";
import SelectServiceTriggerBtn from "./Service/SelectServiceTriggerBtn";

const ServiceHeader: FC = () => {
  const { serviceHeaderBg } = useColors();

  return (
    <Flex
      h="70px"
      pl={["5px", "5px", "50px", "50px"]}
      pr={["5px", "5px", "50px", "50px"]}
      bgColor={serviceHeaderBg}
      align="center"
      width="full">
      <MLogo />
      <Box ml="5px">
        <SelectServiceTriggerBtn />
      </Box>
      <Spacer />
      <NotificationTriggerBtn />
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
